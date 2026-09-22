(function (w, d) {
  'use strict';
  const AN = w.ANVoiceSite = w.ANVoiceSite || {};

  function onReady(fn) {
    if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', fn, { once:true });
    else fn();
  }

  onReady(function initVoice() {
    const widget = d.getElementById('voiceWidget');
    const toggle = d.getElementById('voiceToggle');
    const startButton = d.getElementById('voiceStart');
    const voiceLanguage = d.getElementById('voiceLanguage');
    const message = d.getElementById('voiceMessage');
    if (!widget || !toggle || !startButton || !voiceLanguage || !message) return;

    const config = Object.assign({
      transcribeEndpoint:'',
      vadThreshold:0.035,
      silenceMs:900,
      maxRecordMs:9000,
      minRecordMs:350,
      browserRestartMs:350,
      autoOpenExternal:false
    }, w.AN_VOICE_CONFIG || {});

    if (!voiceLanguage.querySelector('option[value="auto"]')) {
      const option = d.createElement('option');
      option.value = 'auto';
      option.textContent = (AN.t && AN.t().voiceAuto) || 'AUTO · EN / RU / FI';
      voiceLanguage.insertBefore(option, voiceLanguage.firstChild);
    }
    if (!config.transcribeEndpoint) {
      const autoOption = voiceLanguage.querySelector('option[value="auto"]');
      if (autoOption) { autoOption.disabled = true; autoOption.hidden = true; }
    }
    voiceLanguage.value = config.transcribeEndpoint ? 'auto' : (voiceLanguage.value === 'auto' ? 'en-US' : (voiceLanguage.value || 'en-US'));

    let recognition = null;
    let restartTimer = null;
    let autoController = null;

    function updateAutoLabel() {
      const option = voiceLanguage.querySelector('option[value="auto"]');
      if (option && AN.t) option.textContent = AN.t().voiceAuto;
    }

    function setMessage(text) {
      message.textContent = text || '';
    }

    function handleTranscript(spoken) {
      const text = String(spoken || '').trim();
      if (!text) return false;
      const result = AN.routeRequest ? AN.routeRequest(text) : { handled:false };

      if (!result.handled) {
        setMessage(AN.t().voiceHeard + text + ' · ' + AN.t().voiceUnknown);
        return false;
      }

      if (result.type === 'scroll') {
        if (AN.performScroll) AN.performScroll(result.action);
        setMessage(AN.t().voiceHeard + text + ' · ' + AN.t().voiceFound);
        return true;
      }

      if (result.type === 'price_ambiguous') {
        if (AN.showPriceModal) AN.showPriceModal();
        setMessage((AN.t().priceQuestion || 'Which product price are you interested in?'));
        return true;
      }

      if (result.type === 'price_cancel') {
        if (AN.hidePriceModal) AN.hidePriceModal();
        setMessage(AN.t().voiceReady);
        return true;
      }

      if (result.type === 'product') {
        if (AN.openProduct) AN.openProduct(result.product, true);
        setMessage(AN.t().voiceHeard + text + ' · ' + AN.t().voiceFound);
        return true;
      }

      if (result.type === 'language') {
        AN.setSiteLanguage(result.lang);
        updateAutoLabel();
        setMessage(AN.t().voiceHeard + text + ' · ' + AN.t().voiceFound);
        return true;
      }

      if (result.type === 'section') {
        AN.showSection(result.id);
        setMessage(AN.t().voiceHeard + text + ' · ' + AN.t().voiceFound);
        return true;
      }

      if (result.type === 'external') {
        setMessage(AN.t().voiceHeard + text + ' · ' + AN.t().voiceFound);
        if (config.autoOpenExternal) {
          w.location.assign(result.url);
        } else {
          let open = d.getElementById('anVoiceOpenExternal');
          if (!open) {
            open = d.createElement('button');
            open.type = 'button';
            open.id = 'anVoiceOpenExternal';
            open.style.cssText = 'margin-top:8px;padding:7px 10px;border:1px solid #826792;border-radius:9px;background:#3d3047;color:#fff;font:600 12px Arial,sans-serif;';
            message.insertAdjacentElement('afterend', open);
          }
          open.textContent = result.url.includes('/boook') ? 'Open book →' : result.url.includes('/antest') ? 'Open ANITA →' : 'Open Alex Node →';
          open.onclick = function () { w.location.assign(result.url); };
        }
        return true;
      }

      return false;
    }

    function stopBrowserRecognition() {
      clearTimeout(restartTimer);
      if (recognition) {
        const old = recognition;
        recognition = null;
        try { old.onend = null; old.stop(); } catch (_) {}
      }
    }

    function browserLanguage() {
      if (voiceLanguage.value !== 'auto') return voiceLanguage.value;
      const site = AN.siteLanguage ? AN.siteLanguage.value : 'en';
      return site === 'ru' ? 'ru-RU' : site === 'fi' ? 'fi-FI' : 'en-US';
    }

    function startBrowserRecognition() {
      const Recognition = w.SpeechRecognition || w.webkitSpeechRecognition;
      if (!Recognition) {
        AN.listening = false;
        AN.render();
        setMessage(AN.t().voiceUnsupported);
        return;
      }

      recognition = new Recognition();
      recognition.lang = browserLanguage();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.maxAlternatives = 3;

      recognition.onresult = function (event) {
        if (!event.results) return;
        for (let index = event.resultIndex || 0; index < event.results.length; index++) {
          const result = event.results[index];
          if (!result || !result.isFinal) continue;
          let chosen = '';
          for (let i = 0; i < result.length; i++) {
            const candidate = result[i] && result[i].transcript;
            if (!candidate) continue;
            if (!chosen) chosen = candidate;
            const routed = AN.routeRequest ? AN.routeRequest(candidate) : { handled:false };
            if (routed.handled) { chosen = candidate; break; }
          }
          if (chosen) handleTranscript(chosen);
        }
      };

      recognition.onerror = function (event) {
        const error = event && event.error;
        if (error === 'not-allowed' || error === 'service-not-allowed') {
          AN.listening = false;
          stopBrowserRecognition();
          AN.render();
          setMessage(AN.t().voiceDenied);
          return;
        }
        if (error === 'audio-capture') setMessage(AN.t().voiceDenied);
      };

      recognition.onend = function () {
        recognition = null;
        if (!AN.listening || voiceLanguage.value === 'auto' && config.transcribeEndpoint) return;
        restartTimer = w.setTimeout(function () {
          if (AN.listening) startBrowserRecognition();
        }, config.browserRestartMs);
      };

      try { recognition.start(); }
      catch (_) {
        AN.listening = false;
        AN.render();
      }
    }

    function mimeTypeForRecorder() {
      if (!w.MediaRecorder) return '';
      const candidates = ['audio/webm;codecs=opus','audio/webm','audio/ogg;codecs=opus','audio/ogg'];
      return candidates.find(function (type) { return MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(type); }) || '';
    }

    function createAutoController() {
      let stream = null;
      let audioContext = null;
      let analyser = null;
      let source = null;
      let raf = 0;
      let recorder = null;
      let chunks = [];
      let recordingStartedAt = 0;
      let silenceStartedAt = 0;
      let processing = false;
      let active = false;
      let speechFrames = 0;

      async function transcribe(blob) {
        if (!blob || blob.size < 500) return;
        processing = true;
        setMessage(AN.t().voiceProcessing);
        const form = new FormData();
        const type = blob.type || 'audio/webm';
        const ext = type.includes('ogg') ? 'ogg' : 'webm';
        form.append('file', blob, 'voice-command.' + ext);

        try {
          const response = await fetch(config.transcribeEndpoint, { method:'POST', body:form, credentials:'omit' });
          if (!response.ok) throw new Error('HTTP ' + response.status);
          const data = await response.json();
          const text = String(data.text || data.transcript || '').trim();
          if (text) handleTranscript(text);
          else setMessage(AN.t().voiceUnknown);
        } catch (error) {
          console.error('[Alex Node Voice] transcription failed:', error);
          setMessage('Voice service error. Please try again.');
        } finally {
          processing = false;
        }
      }

      function finishRecording() {
        if (!recorder || recorder.state !== 'recording') return;
        try { recorder.stop(); } catch (_) {}
      }

      function beginRecording() {
        if (!active || processing || recorder && recorder.state === 'recording') return;
        chunks = [];
        const mimeType = mimeTypeForRecorder();
        try {
          recorder = mimeType ? new MediaRecorder(stream, { mimeType:mimeType }) : new MediaRecorder(stream);
        } catch (e) {
          console.error('[Alex Node Voice] MediaRecorder:', e);
          return;
        }
        recorder.ondataavailable = function (event) { if (event.data && event.data.size) chunks.push(event.data); };
        recorder.onstop = function () {
          const blob = new Blob(chunks, { type:recorder.mimeType || mimeType || 'audio/webm' });
          recorder = null;
          chunks = [];
          if (active) transcribe(blob);
        };
        recordingStartedAt = performance.now();
        silenceStartedAt = 0;
        try { recorder.start(); } catch (_) {}
      }

      function meterLoop() {
        if (!active || !analyser) return;
        const data = new Uint8Array(analyser.fftSize);
        analyser.getByteTimeDomainData(data);
        let sum = 0;
        for (let i = 0; i < data.length; i++) {
          const n = (data[i] - 128) / 128;
          sum += n * n;
        }
        const rms = Math.sqrt(sum / data.length);
        const now = performance.now();
        const speaking = rms >= config.vadThreshold;

        if (!processing && (!recorder || recorder.state !== 'recording')) {
          speechFrames = speaking ? speechFrames + 1 : 0;
          if (speechFrames >= 2) {
            beginRecording();
            speechFrames = 0;
          }
        } else if (recorder && recorder.state === 'recording') {
          if (speaking) silenceStartedAt = 0;
          else if (!silenceStartedAt) silenceStartedAt = now;

          const elapsed = now - recordingStartedAt;
          if (elapsed >= config.maxRecordMs || (elapsed >= config.minRecordMs && silenceStartedAt && now - silenceStartedAt >= config.silenceMs)) {
            finishRecording();
          }
        }

        raf = w.requestAnimationFrame(meterLoop);
      }

      return {
        async start() {
          if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !w.MediaRecorder) {
            throw new Error('MediaRecorder unavailable');
          }
          active = true;
          stream = await navigator.mediaDevices.getUserMedia({
            audio:{ echoCancellation:true, noiseSuppression:true, autoGainControl:true }, video:false
          });
          const Ctx = w.AudioContext || w.webkitAudioContext;
          audioContext = new Ctx();
          if (audioContext.state === 'suspended') await audioContext.resume();
          analyser = audioContext.createAnalyser();
          analyser.fftSize = 1024;
          source = audioContext.createMediaStreamSource(stream);
          source.connect(analyser);
          meterLoop();
        },
        stop() {
          active = false;
          if (raf) w.cancelAnimationFrame(raf);
          raf = 0;
          if (recorder && recorder.state === 'recording') {
            try { recorder.onstop = null; recorder.stop(); } catch (_) {}
          }
          recorder = null;
          chunks = [];
          if (source) { try { source.disconnect(); } catch (_) {} }
          source = null;
          analyser = null;
          if (audioContext) { try { audioContext.close(); } catch (_) {} }
          audioContext = null;
          if (stream) stream.getTracks().forEach(function (track) { track.stop(); });
          stream = null;
          processing = false;
        }
      };
    }

    async function startAutoRecognition() {
      if (!config.transcribeEndpoint) {
        setMessage(AN.t().voiceAutoNeedsEndpoint);
        startBrowserRecognition();
        return;
      }
      autoController = createAutoController();
      try {
        await autoController.start();
        setMessage(AN.t().voiceReady);
      } catch (error) {
        console.error('[Alex Node Voice] microphone start failed:', error);
        autoController = null;
        AN.listening = false;
        AN.render();
        setMessage(AN.t().voiceDenied);
      }
    }

    function stopVoice() {
      AN.listening = false;
      clearTimeout(restartTimer);
      stopBrowserRecognition();
      if (autoController) autoController.stop();
      autoController = null;
      AN.render();
      updateAutoLabel();
    }

    async function startVoice() {
      AN.listening = true;
      AN.render();
      updateAutoLabel();
      if (voiceLanguage.value === 'auto') await startAutoRecognition();
      else startBrowserRecognition();
    }

    toggle.addEventListener('click', function () {
      const collapsed = widget.classList.toggle('collapsed');
      toggle.textContent = collapsed ? '⌃' : '⌄';
      toggle.setAttribute('aria-expanded', String(!collapsed));
      toggle.setAttribute('aria-label', collapsed ? 'Expand assistant' : 'Collapse assistant');
    });

    startButton.addEventListener('click', function () {
      if (AN.listening) stopVoice();
      else startVoice();
    });

    voiceLanguage.addEventListener('change', function () {
      if (!AN.listening) return;
      stopVoice();
      startVoice();
    });

    if (AN.siteLanguage) {
      AN.siteLanguage.addEventListener('change', updateAutoLabel);
    }
    updateAutoLabel();

    AN.voice = { start:startVoice, stop:stopVoice, handleTranscript:handleTranscript, config:config };
  });
})(window, document);
