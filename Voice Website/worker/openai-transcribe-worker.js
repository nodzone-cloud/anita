export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowed = (env.ALLOWED_ORIGINS || 'https://alexnode.fi,https://www.alexnode.fi')
      .split(',')
      .map(x => x.trim())
      .filter(Boolean);

    const corsOrigin = allowed.includes(origin) ? origin : allowed[0] || 'https://alexnode.fi';
    const corsHeaders = {
      'Access-Control-Allow-Origin': corsOrigin,
      'Access-Control-Allow-Methods': 'POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin',
      'Cache-Control': 'no-store'
    };

    if (request.method === 'OPTIONS') {
      if (origin && !allowed.includes(origin)) {
        return new Response(null, { status:403, headers:corsHeaders });
      }
      return new Response(null, { status:204, headers:corsHeaders });
    }

    const url = new URL(request.url);
    if (request.method !== 'POST' || url.pathname !== '/transcribe') {
      return json({ error:'Not found' }, 404, corsHeaders);
    }

    if (origin && !allowed.includes(origin)) {
      return json({ error:'Origin not allowed' }, 403, corsHeaders);
    }

    if (!env.OPENAI_API_KEY) {
      return json({ error:'OPENAI_API_KEY is not configured' }, 500, corsHeaders);
    }

    let incoming;
    try {
      incoming = await request.formData();
    } catch (_) {
      return json({ error:'Expected multipart/form-data' }, 400, corsHeaders);
    }

    const file = incoming.get('file') || incoming.get('audio');
    if (!(file instanceof File)) {
      return json({ error:'Audio file is missing' }, 400, corsHeaders);
    }

    if (file.size > 8 * 1024 * 1024) {
      return json({ error:'Audio file is too large' }, 413, corsHeaders);
    }

    const body = new FormData();
    body.append('file', file, file.name || 'voice-command.webm');
    body.append('model', 'gpt-4o-mini-transcribe');
    body.append('response_format', 'json');
    body.append(
      'prompt',
      'Short website navigation command. The speaker may use English, Russian, or Finnish. Preserve the spoken language and names such as Alex Node, ANITA, Human Tech.'
    );

    let upstream;
    try {
      upstream = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method:'POST',
        headers:{ 'Authorization':'Bearer ' + env.OPENAI_API_KEY },
        body
      });
    } catch (error) {
      return json({ error:'Transcription service unavailable' }, 502, corsHeaders);
    }

    const raw = await upstream.text();
    if (!upstream.ok) {
      return json({ error:'Transcription failed', status:upstream.status, details:raw.slice(0, 500) }, 502, corsHeaders);
    }

    let data;
    try { data = JSON.parse(raw); }
    catch (_) { return json({ error:'Invalid transcription response' }, 502, corsHeaders); }

    return json({ text:String(data.text || '').trim() }, 200, corsHeaders);
  }
};

function json(value, status, headers) {
  return new Response(JSON.stringify(value), {
    status,
    headers:Object.assign({ 'Content-Type':'application/json; charset=utf-8' }, headers)
  });
}
