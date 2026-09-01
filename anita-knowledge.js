/* ANITA — Alex Node IT Assistance
   External knowledge + interaction logic for alexnode.fi
   Keep this file in the GitHub repository: nodzone-cloud/anita
*/

const CONFIG={email:"AN@alexnode.fi",phoneDisplay:"+358 45 852 5293",phone:"+358458525293",website:"https://alexnode.fi",whatsapp:"https://wa.me/358458525293"};

const UI={
ru:{hello:`Здравствуйте!

Я ANITA — виртуальный IT-помощник Alex Node IT Assistance.

Опишите проблему своими словами. Вам не нужно подбирать специальную техническую формулировку — я постараюсь понять весь ваш текст, ключевые слова и смысл вопроса.

Чем я могу вам помочь?`,placeholder:"Опишите проблему своими словами…",send:"Отправить",online:"онлайн",footer:"ANITA AI Demo — первичная IT-консультация. Не заменяет физическую диагностику оборудования.",unknown:`Я пока не смогла достаточно точно определить проблему.

Опишите, пожалуйста:
• что именно не работает;
• когда проблема появилась;
• что происходило перед этим;
• что вы уже пробовали сделать.`,wrong:"Поняла. Значит, предыдущую проблему я определила неправильно. Опишите немного подробнее, что именно происходит.",retry:n=>`Поняла. Предыдущий совет не помог.

Попытка ${n} из 7.

Напишите, что именно произошло после выполнения рекомендаций или какой шаг не сработал.`,escalate:"Похоже, мы уже попробовали несколько вариантов диагностики, но проблема остаётся. После 7 неудачных попыток я рекомендую перейти к диагностике специалистом.",contactTitle:"Alex Node IT Assistance",contactText:"Вы можете связаться с Alex Node для более подробной диагностики и IT-поддержки.",otherTitle:"Другие варианты поддержки",otherText:"Можно также обратиться в официальный или независимый IT-сервис.",call:"Позвонить",mail:"E-mail",site:"Сайт",whatsapp:"WhatsApp",chips:["Не работает монитор","Нет интернета","Медленный компьютер","CPU 100%","RAM заполнена","Контакты специалиста"]},
en:{hello:`Hello!

I'm ANITA — the virtual IT assistant from Alex Node IT Assistance.

Describe the problem in your own words. You don't need exact technical terminology.

How can I help you?`,placeholder:"Describe your problem in your own words…",send:"Send",online:"online",footer:"ANITA AI Demo — first-line IT guidance. It does not replace physical hardware diagnostics.",unknown:"I'm not yet confident that I understood the problem correctly. Tell me what is not working, when it started, what happened before it started and what you already tried.",wrong:"Understood. My previous interpretation was incorrect. Please describe what is happening in a little more detail.",retry:n=>`Understood. The previous suggestion did not solve the problem.

Attempt ${n} of 7.

Tell me what happened after trying the steps or which step did not work.`,escalate:"It looks like we have already tried several troubleshooting options but the problem remains. After 7 unsuccessful attempts I recommend continuing with a specialist.",contactTitle:"Alex Node IT Assistance",contactText:"You can contact Alex Node for more detailed diagnostics and IT support.",otherTitle:"Other support options",otherText:"You can also contact an official or independent IT service.",call:"Call",mail:"E-mail",site:"Website",whatsapp:"WhatsApp",chips:["Monitor not working","No internet","Computer is slow","CPU 100%","RAM full","Contact a specialist"]},
fi:{hello:`Hei!

Olen ANITA — Alex Node IT Assistancen virtuaalinen IT-avustaja.

Kuvaile ongelma omin sanoin. Sinun ei tarvitse tietää tarkkoja teknisiä termejä.

Miten voin auttaa?`,placeholder:"Kuvaile ongelma omin sanoin…",send:"Lähetä",online:"verkossa",footer:"ANITA AI Demo — ensivaiheen IT-neuvonta. Ei korvaa laitteen fyysistä diagnostiikkaa.",unknown:"En ole vielä varma, ymmärsinkö ongelman oikein. Kerro mikä ei toimi, milloin ongelma alkoi, mitä tapahtui ennen sitä ja mitä olet jo kokeillut.",wrong:"Ymmärsin. Edellinen tulkintani oli väärä. Kuvaile hieman tarkemmin, mitä tapahtuu.",retry:n=>`Ymmärsin. Edellinen neuvo ei ratkaissut ongelmaa.

Yritys ${n} / 7.

Kerro, mitä tapahtui ohjeiden jälkeen tai mikä vaihe ei toiminut.`,escalate:"Olemme kokeilleet useita vianmääritysvaihtoehtoja, mutta ongelma jatkuu. Seitsemän epäonnistuneen yrityksen jälkeen suosittelen asiantuntijaa.",contactTitle:"Alex Node IT Assistance",contactText:"Voit ottaa yhteyttä Alex Nodeen tarkempaa diagnostiikkaa ja IT-tukea varten.",otherTitle:"Muut tukivaihtoehdot",otherText:"Voit myös ottaa yhteyttä viralliseen tai riippumattomaan IT-palveluun.",call:"Soita",mail:"Sähköposti",site:"Verkkosivu",whatsapp:"WhatsApp",chips:["Näyttö ei toimi","Internet ei toimi","Tietokone on hidas","CPU 100 %","RAM täynnä","Ota yhteys asiantuntijaan"]}
};

const knowledge=[
{id:"monitor",p:{ru:["не работает монитор","монитор не показывает","экран не работает","нет изображения на мониторе","монитор погас","экран черный"],en:["monitor not working","monitor shows nothing","screen not working","no image on monitor","monitor went black","black screen"],fi:["näyttö ei toimi","näyttö ei näytä kuvaa","näytössä ei ole kuvaa","näyttö pimeni","näyttö on musta"]},k:{ru:["монитор","экран","изображение","hdmi","displayport"],en:["monitor","screen","image","display","hdmi","displayport"],fi:["näyttö","kuva","hdmi","displayport"]},a:{ru:"Если монитор не показывает изображение:\n\n1. Проверьте питание.\n2. Переподключите HDMI/DisplayPort.\n3. Проверьте Input/Source.\n4. Нажмите Win + P.\n5. Попробуйте другой кабель или видеовыход.\n6. Если возможно, проверьте монитор на другом компьютере.",en:"If the monitor shows no image:\n\n1. Check power.\n2. Reconnect HDMI/DisplayPort.\n3. Select the correct Input/Source.\n4. Press Win + P.\n5. Try another cable or video output.\n6. Test the monitor on another computer if possible.",fi:"Jos näyttöön ei tule kuvaa:\n\n1. Tarkista virta.\n2. Kytke HDMI/DisplayPort uudelleen.\n3. Valitse oikea Input/Source.\n4. Paina Win + P.\n5. Kokeile toista kaapelia tai videolähtöä.\n6. Testaa toisella tietokoneella."}},
{id:"slow",p:{ru:["компьютер медленно работает","компьютер тормозит","компьютер зависает","ноутбук тормозит","компьютер лагает"],en:["computer is slow","computer is very slow","computer keeps freezing","laptop is slow","computer is lagging"],fi:["tietokone on hidas","tietokone toimii hitaasti","tietokone jumittaa","kannettava on hidas"]},k:{ru:["медленно","тормозит","зависает","лагает","производительность"],en:["slow","sluggish","freezing","lagging","performance"],fi:["hidas","hitaasti","jumittaa","suorituskyky"]},a:{ru:"Если компьютер работает медленно:\n\n1. Перезагрузите его.\n2. Откройте Диспетчер задач Ctrl+Shift+Esc.\n3. Проверьте CPU, RAM и диск.\n4. Проверьте свободное место на C.\n5. Отключите ненужную автозагрузку.\n6. Выполните Windows Security.",en:"If the computer is slow:\n\n1. Restart it.\n2. Open Task Manager.\n3. Check CPU, RAM and disk usage.\n4. Check free space.\n5. Disable unnecessary startup apps.\n6. Run Windows Security.",fi:"Jos tietokone on hidas:\n\n1. Käynnistä se uudelleen.\n2. Avaa Tehtävienhallinta.\n3. Tarkista CPU, RAM ja levy.\n4. Tarkista vapaa tila.\n5. Poista tarpeettomat käynnistysohjelmat.\n6. Suorita Windows Security."}},
{id:"internet",p:{ru:["нет интернета","интернет не работает","пропал интернет","нет доступа в интернет","подключено но интернета нет"],en:["no internet","internet not working","internet stopped working","no internet access","connected but no internet"],fi:["internet ei toimi","ei internet-yhteyttä","internet katosi","yhteys katkesi"]},k:{ru:["интернет","сеть","провайдер","wan","ethernet"],en:["internet","network","isp","wan","ethernet"],fi:["internet","verkko","yhteys","wan"]},a:{ru:"Если интернет пропал:\n\n1. Проверьте его на другом устройстве.\n2. Перезагрузите роутер.\n3. Перезагрузите компьютер.\n4. Переподключите Wi-Fi/Ethernet.\n5. Проверьте Internet/WAN индикатор.\n\nЕсли интернета нет на всех устройствах, проблема может быть у провайдера.",en:"If internet access is gone:\n\n1. Test another device.\n2. Restart the router.\n3. Restart the computer.\n4. Reconnect Wi-Fi/Ethernet.\n5. Check the Internet/WAN light.\n\nIf all devices are offline, the ISP may be the problem.",fi:"Jos internet ei toimi:\n\n1. Testaa toisella laitteella.\n2. Käynnistä reititin uudelleen.\n3. Käynnistä tietokone uudelleen.\n4. Yhdistä Wi-Fi/Ethernet uudelleen.\n5. Tarkista Internet/WAN-valo."}},
{id:"printer",p:{ru:["принтер не работает","принтер не печатает","не могу распечатать","компьютер не видит принтер","печать зависла"],en:["printer not working","printer not printing","cannot print","computer cannot see printer","printing is stuck"],fi:["tulostin ei toimi","tulostin ei tulosta","en voi tulostaa","tietokone ei löydä tulostinta"]},k:{ru:["принтер","печать","картридж"],en:["printer","print","printing"],fi:["tulostin","tulostaa","tulostus"]},a:{ru:"Если принтер не печатает:\n\n1. Проверьте питание.\n2. Проверьте USB/Wi-Fi.\n3. Проверьте бумагу и ошибки.\n4. Выберите правильный принтер.\n5. Очистите очередь печати.\n6. Перезапустите принтер и ПК.\n7. При необходимости переустановите официальный драйвер.",en:"If the printer does not print:\n\n1. Check power.\n2. Check USB/Wi-Fi.\n3. Check paper/errors.\n4. Select the correct printer.\n5. Clear the print queue.\n6. Restart printer and computer.\n7. Reinstall the official driver if needed.",fi:"Jos tulostin ei tulosta:\n\n1. Tarkista virta.\n2. Tarkista USB/Wi-Fi.\n3. Tarkista paperi ja virheet.\n4. Valitse oikea tulostin.\n5. Tyhjennä tulostusjono.\n6. Käynnistä laitteet uudelleen."}},
{id:"windowsInstall",p:{ru:["переустановить windows","установить windows","поставить windows заново","чистая установка windows","переустановка виндовс"],en:["reinstall windows","install windows","clean windows install","reset windows"],fi:["asenna windows uudelleen","windowsin uudelleenasennus","puhdas windows-asennus","windowsin nollaus"]},k:{ru:["переустановить","виндовс","сброс windows"],en:["reinstall","install windows","reset windows"],fi:["windows","uudelleenasennus","nollaus"]},a:{ru:"Переустановить Windows можно двумя способами.\n\nСПОСОБ 1 — через сам Windows:\n1. Сохраните важные файлы на внешний диск или OneDrive.\n2. Откройте Settings → System → Recovery.\n3. Нажмите Reset PC.\n4. Выберите Keep my files или Remove everything.\n5. Выберите Cloud download или Local reinstall.\n6. Проверьте настройки и нажмите Reset.\n7. Компьютер перезагрузится несколько раз — не выключайте его.\n8. После установки завершите первоначальную настройку.\n9. Запустите Windows Update.\n10. Установите нужные программы и недостающие драйверы.\n\nСПОСОБ 2 — чистая установка с USB. Обычно нужна флешка от 8 GB. Напишите «как через USB», и я дам пошаговую инструкцию.\n\n⚠️ Перед переустановкой обязательно сделайте резервную копию важных данных.",en:"There are two main ways to reinstall Windows.\n\nMETHOD 1 — from Windows itself:\n1. Back up important files to an external drive or OneDrive.\n2. Open Settings → System → Recovery.\n3. Click Reset PC.\n4. Choose Keep my files or Remove everything.\n5. Choose Cloud download or Local reinstall.\n6. Review the settings and click Reset.\n7. The PC will restart several times — do not turn it off.\n8. Complete the Windows first-time setup.\n9. Run Windows Update.\n10. Reinstall your programs and any missing drivers.\n\nMETHOD 2 — a clean installation from USB. You normally need an 8 GB or larger USB drive. Write “how with USB” and I’ll give you the step-by-step USB procedure.\n\n⚠️ Always back up important data before reinstalling Windows.",fi:"Windowsin voi asentaa uudelleen kahdella tavalla.\n\nTAPA 1 — Windowsin sisältä:\n1. Varmuuskopioi tärkeät tiedostot ulkoiselle levylle tai OneDriveen.\n2. Avaa Asetukset → Järjestelmä → Palautus.\n3. Valitse Reset PC / Palauta tietokone.\n4. Valitse Säilytä tiedostoni tai Poista kaikki.\n5. Valitse Pilvilataus tai Paikallinen uudelleenasennus.\n6. Tarkista asetukset ja aloita palautus.\n7. PC käynnistyy useita kertoja uudelleen — älä sammuta sitä.\n8. Tee Windowsin alkuasetukset.\n9. Suorita Windows Update.\n10. Asenna ohjelmat ja puuttuvat ajurit.\n\nTAPA 2 — puhdas USB-asennus. Tarvitset yleensä vähintään 8 GB USB-muistin. Kirjoita “miten USB:llä”, niin annan vaiheittaiset ohjeet.\n\n⚠️ Varmuuskopioi tärkeät tiedot ennen uudelleenasennusta."}},
{id:"software",p:{ru:["программа не устанавливается","не могу установить программу","ошибка установки","программа не запускается"],en:["program will not install","cannot install program","installation error","program will not start"],fi:["ohjelma ei asennu","en voi asentaa ohjelmaa","asennusvirhe","ohjelma ei käynnisty"]},k:{ru:["программа","приложение","установщик","софт"],en:["program","application","installer","software"],fi:["ohjelma","sovellus","asennus"]},a:{ru:"Если программа не устанавливается:\n\n1. Проверьте совместимость.\n2. Проверьте свободное место.\n3. Перезагрузите ПК.\n4. Запустите установщик от администратора.\n5. Проверьте Windows Update.\n6. Используйте официальный установщик.",en:"If a program will not install:\n\n1. Check compatibility.\n2. Check free space.\n3. Restart.\n4. Run installer as administrator.\n5. Check Windows Update.\n6. Use the official installer.",fi:"Jos ohjelma ei asennu:\n\n1. Tarkista yhteensopivuus.\n2. Tarkista vapaa tila.\n3. Käynnistä uudelleen.\n4. Suorita asennus järjestelmänvalvojana.\n5. Tarkista Windows Update."}},
{id:"sound",p:{ru:["нет звука","звук не работает","пропал звук","колонки не работают"],en:["no sound","sound not working","audio disappeared","speakers not working"],fi:["ääntä ei kuulu","ääni ei toimi","ääni katosi","kaiuttimet eivät toimi"]},k:{ru:["звук","аудио","динамик","колонки"],en:["sound","audio","speaker"],fi:["ääni","audio","kaiutin"]},a:{ru:"Если нет звука:\n\n1. Проверьте громкость.\n2. Выберите правильное устройство вывода.\n3. Переподключите наушники/колонки.\n4. Проверьте Bluetooth.\n5. Перезапустите ПК.\n6. Проверьте аудиодрайвер.",en:"If there is no sound:\n\n1. Check volume.\n2. Select the correct output.\n3. Reconnect headphones/speakers.\n4. Check Bluetooth.\n5. Restart.\n6. Check audio driver.",fi:"Jos ääntä ei kuulu:\n\n1. Tarkista äänenvoimakkuus.\n2. Valitse oikea äänilaite.\n3. Kytke kuulokkeet/kaiuttimet uudelleen.\n4. Tarkista Bluetooth.\n5. Käynnistä uudelleen."}},
{id:"usb",p:{ru:["usb не работает","компьютер не видит usb","флешка не определяется","usb порт не работает"],en:["usb not working","computer cannot see usb","usb drive not detected","usb port not working"],fi:["usb ei toimi","tietokone ei löydä usb-laitetta","muistitikku ei näy","usb-portti ei toimi"]},k:{ru:["usb","флешка","порт"],en:["usb","flash drive","port"],fi:["usb","muistitikku","portti"]},a:{ru:"Если USB не определяется:\n\n1. Попробуйте другой порт.\n2. Переподключите устройство.\n3. Перезагрузите ПК.\n4. Проверьте устройство на другом ПК.\n5. Проверьте Диспетчер устройств.",en:"If a USB device is not detected:\n\n1. Try another port.\n2. Reconnect it.\n3. Restart.\n4. Test on another PC.\n5. Check Device Manager.",fi:"Jos USB-laitetta ei tunnisteta:\n\n1. Kokeile toista porttia.\n2. Kytke uudelleen.\n3. Käynnistä tietokone uudelleen.\n4. Testaa toisella tietokoneella."}},
{id:"storage",p:{ru:["нет места на диске","диск заполнен","жесткий диск заполнен","диск c полный","заканчивается место"],en:["disk is full","no space left","hard drive is full","drive c is full","running out of space"],fi:["levy on täynnä","tila loppui","kiintolevy on täynnä","c-asema on täynnä"]},k:{ru:["диск","место","жесткий диск","hdd","ssd"],en:["disk","space","storage","hard drive","hdd","ssd"],fi:["levy","tila","kiintolevy","hdd","ssd"]},a:{ru:"Если на диске заканчивается место:\n\n1. Откройте Параметры → Система → Память.\n2. Посмотрите, что занимает место.\n3. Удалите временные файлы.\n4. Очистите Корзину.\n5. Проверьте Загрузки.\n6. Перенесите большие файлы.",en:"If disk space is running out:\n\n1. Open Settings → System → Storage.\n2. Check what uses space.\n3. Remove temporary files.\n4. Empty Recycle Bin.\n5. Check Downloads.\n6. Move large files.",fi:"Jos levytila loppuu:\n\n1. Avaa Tallennustila.\n2. Tarkista mikä vie tilaa.\n3. Poista väliaikaiset tiedostot.\n4. Tyhjennä Roskakori.\n5. Tarkista Lataukset."}},
{id:"virus",p:{ru:["у меня вирус","компьютер заражен","подозреваю вирус","как удалить вирус"],en:["computer has virus","computer is infected","i suspect malware","how to remove virus"],fi:["tietokoneessa on virus","tietokone on saastunut","epäilen haittaohjelmaa","miten poistan viruksen"]},k:{ru:["вирус","malware","заражен","угроза"],en:["virus","malware","infected","threat"],fi:["virus","haittaohjelma","uhka"]},a:{ru:"Если подозреваете вирус:\n\n1. Не вводите банковские данные и важные пароли.\n2. Запустите полную проверку Windows Security.\n3. Проверьте недавно установленные программы и расширения браузера.\n4. При подозрении на кражу паролей смените их с другого безопасного устройства.",en:"If you suspect malware:\n\n1. Do not enter banking info or important passwords.\n2. Run a full Windows Security scan.\n3. Check recently installed apps and browser extensions.\n4. Change possibly stolen passwords from a safe device.",fi:"Jos epäilet haittaohjelmaa:\n\n1. Älä syötä pankkitietoja tai tärkeitä salasanoja.\n2. Suorita Windows Securityn täysi tarkistus.\n3. Tarkista uudet ohjelmat ja selainlaajennukset."}},
{id:"wifi",p:{ru:["wifi не работает","wifi не подключается","не вижу wifi","вайфай пропал"],en:["wifi not working","wifi will not connect","cannot see wifi","wifi disappeared"],fi:["wifi ei toimi","wifi ei yhdistä","wifi ei näy","wifi katosi"]},k:{ru:["wifi","wi-fi","вайфай"],en:["wifi","wi-fi","wireless"],fi:["wifi","wi-fi","langaton"]},a:{ru:"Если Wi-Fi не подключается:\n\n1. Выключите и включите Wi-Fi.\n2. Перезагрузите ПК и роутер.\n3. Забудьте сеть и подключитесь снова.\n4. Проверьте пароль.\n5. Проверьте сеть на телефоне.",en:"If Wi-Fi will not connect:\n\n1. Toggle Wi-Fi.\n2. Restart computer and router.\n3. Forget network and reconnect.\n4. Check password.\n5. Test on phone.",fi:"Jos Wi-Fi ei yhdistä:\n\n1. Kytke Wi-Fi pois/päälle.\n2. Käynnistä tietokone ja reititin uudelleen.\n3. Unohda verkko ja yhdistä uudelleen.\n4. Tarkista salasana."}},
{id:"weakwifi",p:{ru:["слабый wifi","wifi плохо ловит","wifi медленный","плохой сигнал wifi"],en:["weak wifi","poor wifi signal","wifi is slow","bad wifi coverage"],fi:["wifi-signaali on heikko","wifi toimii huonosti","wifi on hidas","wifi-peitto on huono"]},k:{ru:["слабый","wifi","сигнал","покрытие"],en:["weak","wifi","signal","coverage"],fi:["heikko","wifi","signaali","peitto"]},a:{ru:"Если Wi-Fi слабый:\n\n1. Проверьте скорость рядом с роутером.\n2. Не ставьте роутер в шкаф.\n3. Разместите его выше и открыто.\n4. Попробуйте 5 GHz рядом с роутером.\n5. Для большой квартиры рассмотрите Mesh Wi-Fi.",en:"If Wi-Fi is weak:\n\n1. Test near router.\n2. Do not hide router in cabinet.\n3. Place it higher/open.\n4. Try 5 GHz nearby.\n5. Consider Mesh Wi-Fi.",fi:"Jos Wi-Fi on heikko:\n\n1. Testaa reitittimen lähellä.\n2. Älä sijoita sitä kaappiin.\n3. Sijoita korkealle ja avoimesti.\n4. Kokeile 5 GHz.\n5. Harkitse Mesh Wi-Fiä."}},
{id:"dns",p:{ru:["ошибка dns","dns не работает","dns сервер не отвечает","проблема dns"],en:["dns error","dns not working","dns server not responding","dns problem"],fi:["dns-virhe","dns ei toimi","dns-palvelin ei vastaa","dns-ongelma"]},k:{ru:["dns","днс","flushdns"],en:["dns","flushdns"],fi:["dns","dns-palvelin"]},a:{ru:"Если ошибка DNS:\n\n1. Перезагрузите роутер и ПК.\n2. Проверьте другие сайты.\n3. Выполните ipconfig /flushdns.\n4. Для теста можно временно использовать 1.1.1.1 или 8.8.8.8.",en:"If there is a DNS error:\n\n1. Restart router and computer.\n2. Test other sites.\n3. Run ipconfig /flushdns.\n4. Temporarily test 1.1.1.1 or 8.8.8.8.",fi:"Jos saat DNS-virheen:\n\n1. Käynnistä reititin ja tietokone uudelleen.\n2. Testaa muita sivuja.\n3. Suorita ipconfig /flushdns.\n4. Testaa 1.1.1.1 tai 8.8.8.8."}},
{id:"bluetooth",p:{ru:["bluetooth не работает","блютуз не работает","bluetooth пропал"],en:["bluetooth not working","bluetooth disappeared","device will not pair"],fi:["bluetooth ei toimi","bluetooth katosi","laite ei muodosta paria"]},k:{ru:["bluetooth","блютуз"],en:["bluetooth","pairing"],fi:["bluetooth","paritus"]},a:{ru:"Если Bluetooth не подключается:\n\n1. Выключите/включите Bluetooth.\n2. Зарядите устройство.\n3. Удалите устройство из списка и сопрягите заново.\n4. Перезагрузите ПК.\n5. Проверьте драйвер.",en:"If Bluetooth will not connect:\n\n1. Toggle Bluetooth.\n2. Charge device.\n3. Remove and pair again.\n4. Restart computer.\n5. Check driver.",fi:"Jos Bluetooth ei yhdistä:\n\n1. Kytke Bluetooth pois/päälle.\n2. Lataa laite.\n3. Poista laite ja muodosta pari uudelleen.\n4. Käynnistä tietokone uudelleen."}},
{id:"microphone",p:{ru:["микрофон не работает","меня не слышно","teams не слышит микрофон","zoom не слышит микрофон"],en:["microphone not working","people cannot hear me","teams cannot hear microphone","zoom cannot hear microphone"],fi:["mikrofoni ei toimi","minua ei kuulla","teams ei kuule mikrofonia","zoom ei kuule mikrofonia"]},k:{ru:["микрофон","teams","zoom"],en:["microphone","teams","zoom"],fi:["mikrofoni","teams","zoom"]},a:{ru:"Если микрофон не работает:\n\n1. Откройте Параметры → Система → Звук.\n2. Выберите правильное устройство ввода.\n3. Проверьте уровень и разрешения.\n4. Проверьте выбранный микрофон в Teams/Zoom.",en:"If microphone does not work:\n\n1. Open Settings → System → Sound.\n2. Select correct input.\n3. Check level and permissions.\n4. Check Teams/Zoom input.",fi:"Jos mikrofoni ei toimi:\n\n1. Avaa Ääniasetukset.\n2. Valitse oikea syöttölaite.\n3. Tarkista taso ja käyttöoikeudet.\n4. Tarkista Teams/Zoom."}},
{id:"webcam",p:{ru:["камера не работает","веб камера не работает","zoom не видит камеру","teams не видит камеру"],en:["camera not working","webcam not working","zoom cannot see camera","teams cannot see camera"],fi:["kamera ei toimi","web-kamera ei toimi","zoom ei löydä kameraa","teams ei löydä kameraa"]},k:{ru:["камера","веб камера","webcam"],en:["camera","webcam"],fi:["kamera","web-kamera"]},a:{ru:"Если камера не работает:\n\n1. Проверьте физическую шторку.\n2. Перезапустите программу.\n3. Проверьте разрешения Windows.\n4. Проверьте Диспетчер устройств.\n5. Выберите правильную камеру в Teams/Zoom.",en:"If webcam does not work:\n\n1. Check privacy shutter.\n2. Restart app.\n3. Check Windows permissions.\n4. Check Device Manager.\n5. Select correct camera in Teams/Zoom.",fi:"Jos kamera ei toimi:\n\n1. Tarkista suojus.\n2. Käynnistä sovellus uudelleen.\n3. Tarkista käyttöoikeudet.\n4. Tarkista Laitehallinta.\n5. Valitse oikea kamera."}},
{id:"projector",p:{ru:["проектор не работает","проектор не показывает","не могу подключить проектор"],en:["projector not working","projector shows nothing","cannot connect projector"],fi:["projektori ei toimi","projektori ei näytä kuvaa","en saa projektoria yhdistettyä"]},k:{ru:["проектор"],en:["projector"],fi:["projektori"]},a:{ru:"Если проектор не показывает:\n\n1. Проверьте HDMI.\n2. Выберите правильный Source/Input.\n3. Нажмите Win+P.\n4. Выберите Дублировать или Расширить.\n5. Попробуйте другой кабель.",en:"If projector shows no image:\n\n1. Check HDMI.\n2. Select Source/Input.\n3. Press Win+P.\n4. Choose Duplicate/Extend.\n5. Try another cable.",fi:"Jos projektori ei näytä kuvaa:\n\n1. Tarkista HDMI.\n2. Valitse Source/Input.\n3. Paina Win+P.\n4. Valitse Monista/Laajenna.\n5. Kokeile toista kaapelia."}},
{id:"secondMonitor",p:{ru:["второй монитор не работает","не видит второй монитор","работает только один монитор"],en:["second monitor not working","cannot detect second monitor","only one monitor works"],fi:["toinen näyttö ei toimi","toista näyttöä ei löydy","vain yksi näyttö toimii"]},k:{ru:["второй монитор","второй экран"],en:["second monitor","second screen"],fi:["toinen näyttö","kaksi näyttöä"]},a:{ru:"Если Windows не видит второй монитор:\n\n1. Проверьте кабель.\n2. Win+P → Расширить.\n3. Параметры → Система → Дисплей → Обнаружить.\n4. Попробуйте другой видеовыход.\n5. Проверьте драйвер видеокарты.",en:"If Windows cannot detect second monitor:\n\n1. Check cable.\n2. Win+P → Extend.\n3. Settings → Display → Detect.\n4. Try another output.\n5. Check graphics driver.",fi:"Jos Windows ei löydä toista näyttöä:\n\n1. Tarkista kaapeli.\n2. Win+P → Laajenna.\n3. Näyttöasetukset → Tunnista.\n4. Kokeile toista videolähtöä."}},
{id:"drivers",p:{ru:["проблема с драйвером","драйвер не работает","драйвер не устанавливается","как обновить драйвер"],en:["driver problem","driver not working","driver will not install","how to update driver"],fi:["ajuriongelma","ajuri ei toimi","ajuri ei asennu","miten päivitän ajurin"]},k:{ru:["драйвер","драйвера"],en:["driver","drivers"],fi:["ajuri","ajurit"]},a:{ru:"Если проблема с драйвером:\n\n1. Откройте Диспетчер устройств.\n2. Найдите устройство с предупреждением.\n3. Проверьте Windows Update.\n4. Используйте официальный сайт производителя.\n5. Перезагрузите ПК.",en:"If driver-related:\n\n1. Open Device Manager.\n2. Find warning device.\n3. Check Windows Update.\n4. Use manufacturer website.\n5. Restart.",fi:"Jos ongelma liittyy ajuriin:\n\n1. Avaa Laitehallinta.\n2. Etsi varoituslaite.\n3. Tarkista Windows Update.\n4. Käytä valmistajan sivustoa."}},
{id:"bsod",p:{ru:["синий экран","bsod","stop code"],en:["blue screen","bsod","stop code"],fi:["sininen ruutu","bsod","stop code"]},k:{ru:["синий экран","bsod","stop code"],en:["blue screen","bsod","stop code"],fi:["sininen ruutu","bsod","stop code"]},a:{ru:"Если появляется синий экран:\n\n1. Сфотографируйте код.\n2. Вспомните, что устанавливалось перед проблемой.\n3. Проверьте обновления и драйверы.\n4. При повторении проверьте память и диск.",en:"If you get BSOD:\n\n1. Photograph code.\n2. Think what changed before it started.\n3. Check updates/drivers.\n4. If repeated, test memory/storage.",fi:"Jos saat sinisen ruudun:\n\n1. Ota kuva virhekoodista.\n2. Mieti mitä muuttui.\n3. Tarkista päivitykset/ajurit.\n4. Testaa muisti ja levy jos toistuu."}},
{id:"heat",p:{ru:["компьютер перегревается","ноутбук сильно греется","вентилятор сильно шумит"],en:["computer overheats","laptop gets very hot","fan is very loud"],fi:["tietokone ylikuumenee","kannettava kuumenee paljon","tuuletin on äänekäs"]},k:{ru:["перегрев","греется","температура","вентилятор","кулер"],en:["overheat","hot","temperature","fan"],fi:["ylikuumenee","kuuma","lämpötila","tuuletin"]},a:{ru:"Если компьютер греется:\n\n1. Не закрывайте вентиляцию.\n2. Не используйте ноутбук на мягкой поверхности.\n3. Проверьте CPU.\n4. Проверьте температуры.\n5. Если есть запах гари/дым — прекратите использование.",en:"If computer gets very hot:\n\n1. Do not block vents.\n2. Avoid soft surfaces.\n3. Check CPU load.\n4. Check temperatures.\n5. Stop using if there is smoke/burning smell.",fi:"Jos tietokone kuumenee:\n\n1. Älä peitä ilmanvaihtoa.\n2. Älä käytä pehmeällä pinnalla.\n3. Tarkista CPU.\n4. Tarkista lämpötilat.\n5. Lopeta käyttö jos haisee palaneelta."}},
{id:"power",p:{ru:["компьютер не включается","ноутбук не включается","ничего не происходит при включении"],en:["computer will not turn on","laptop will not turn on","nothing happens when i press power"],fi:["tietokone ei käynnisty","kannettava ei käynnisty","virtapainikkeesta ei tapahdu mitään"]},k:{ru:["не включается","питание"],en:["will not turn on","no power"],fi:["ei käynnisty","ei virtaa"]},a:{ru:"Если компьютер вообще не включается:\n\n1. Проверьте розетку и кабель.\n2. Для ноутбука подключите зарядку.\n3. Отключите лишние USB.\n4. Если нет индикаторов/вентиляторов, возможна аппаратная проблема.\n\nНе открывайте блок питания самостоятельно.",en:"If computer does not power on:\n\n1. Check outlet/cable.\n2. Connect laptop charger.\n3. Disconnect extra USB.\n4. No lights/fans may mean hardware fault.\n\nDo not open PSU yourself.",fi:"Jos tietokone ei käynnisty:\n\n1. Tarkista pistorasia/johto.\n2. Kytke laturi.\n3. Irrota USB-laitteet.\n4. Jos ei valoja/tuulettimia, vika voi olla laitteistossa.\n\nÄlä avaa virtalähdettä."}},
{id:"boot",p:{ru:["windows не загружается","windows не запускается","зависает при загрузке"],en:["windows will not boot","windows will not start","windows stuck loading"],fi:["windows ei käynnisty","windows ei lataudu","windows jumittuu käynnistykseen"]},k:{ru:["windows","загрузка","не загружается"],en:["windows","boot","startup"],fi:["windows","käynnistys","latautuminen"]},a:{ru:"Если Windows не загружается:\n\n1. Перезагрузите ПК.\n2. Отключите лишние USB.\n3. Откройте среду восстановления.\n4. Используйте Восстановление при загрузке.\n5. Не переустанавливайте Windows до сохранения данных.",en:"If Windows will not boot:\n\n1. Restart.\n2. Disconnect extra USB.\n3. Open Windows Recovery.\n4. Use Startup Repair.\n5. Protect important data before reinstalling.",fi:"Jos Windows ei käynnisty:\n\n1. Käynnistä uudelleen.\n2. Irrota USB-laitteet.\n3. Avaa palautusympäristö.\n4. Käytä Käynnistyksen korjausta.\n5. Suojaa tiedot ennen uudelleenasennusta."}},
{id:"update",p:{ru:["windows update не работает","windows не обновляется","обновление не устанавливается"],en:["windows update not working","windows will not update","update will not install"],fi:["windows update ei toimi","windows ei päivity","päivitys ei asennu"]},k:{ru:["windows update","обновление"],en:["windows update","update"],fi:["windows update","päivitys"]},a:{ru:"Если Windows Update не работает:\n\n1. Перезагрузите ПК.\n2. Проверьте интернет.\n3. Проверьте место на диске.\n4. Запустите обновление снова.\n5. Используйте средство устранения неполадок.\n6. Сохраните код ошибки.",en:"If Windows Update fails:\n\n1. Restart.\n2. Check internet.\n3. Check disk space.\n4. Try again.\n5. Use troubleshooter.\n6. Save error code.",fi:"Jos Windows Update ei toimi:\n\n1. Käynnistä uudelleen.\n2. Tarkista internet.\n3. Tarkista levytila.\n4. Yritä uudelleen.\n5. Käytä vianmääritystä."}},
{id:"browser",p:{ru:["браузер не работает","chrome не работает","edge не работает","сайты не открываются"],en:["browser not working","chrome not working","edge not working","websites will not open"],fi:["selain ei toimi","chrome ei toimi","edge ei toimi","sivustot eivät avaudu"]},k:{ru:["браузер","chrome","edge","сайт"],en:["browser","chrome","edge","website"],fi:["selain","chrome","edge","sivusto"]},a:{ru:"Если браузер работает неправильно:\n\n1. Перезапустите его.\n2. Попробуйте другой сайт.\n3. Проверьте интернет.\n4. Отключите подозрительные расширения.\n5. Очистите кэш.\n6. Обновите браузер.",en:"If browser is not working:\n\n1. Restart it.\n2. Try another site.\n3. Check internet.\n4. Disable suspicious extensions.\n5. Clear cache.\n6. Update browser.",fi:"Jos selain ei toimi:\n\n1. Käynnistä uudelleen.\n2. Kokeile toista sivua.\n3. Tarkista internet.\n4. Poista epäilyttävät laajennukset.\n5. Tyhjennä välimuisti."}},
{id:"email",p:{ru:["почта не работает","outlook не работает","не приходят письма","не отправляются письма"],en:["email not working","outlook not working","emails not arriving","cannot send emails"],fi:["sähköposti ei toimi","outlook ei toimi","viestit eivät saavu","en voi lähettää viestejä"]},k:{ru:["почта","email","outlook","письмо"],en:["email","outlook","mail"],fi:["sähköposti","outlook","viesti"]},a:{ru:"Если почта не работает:\n\n1. Проверьте интернет.\n2. Попробуйте войти через браузер.\n3. Проверьте пароль и Спам.\n4. Проверьте место в ящике.\n5. Перезапустите Outlook.",en:"If email does not work:\n\n1. Check internet.\n2. Try webmail.\n3. Check password/Spam.\n4. Check mailbox storage.\n5. Restart Outlook.",fi:"Jos sähköposti ei toimi:\n\n1. Tarkista internet.\n2. Kokeile selaimella.\n3. Tarkista salasana/Roskaposti.\n4. Tarkista postilaatikon tila.\n5. Käynnistä Outlook uudelleen."}},
{id:"externalDrive",p:{ru:["не видит внешний диск","внешний диск не определяется","ssd не виден","жесткий диск не определяется"],en:["external drive not detected","cannot see external drive","ssd not detected","hard drive not detected"],fi:["ulkoinen levy ei näy","ulkoista levyä ei tunnisteta","ssd ei näy","kiintolevy ei näy"]},k:{ru:["внешний диск","жесткий диск","ssd","hdd"],en:["external drive","hard drive","ssd","hdd"],fi:["ulkoinen levy","kiintolevy","ssd","hdd"]},a:{ru:"Если внешний диск не определяется:\n\n1. Переподключите его.\n2. Попробуйте другой USB-порт/кабель.\n3. Проверьте на другом ПК.\n4. Откройте Управление дисками.\n5. Если Windows просит форматирование и данные важны — не форматируйте.",en:"If external drive is not detected:\n\n1. Reconnect it.\n2. Try another USB port/cable.\n3. Test another PC.\n4. Open Disk Management.\n5. Do not format if important data is present.",fi:"Jos ulkoinen levy ei näy:\n\n1. Kytke uudelleen.\n2. Kokeile toista porttia/kaapelia.\n3. Testaa toisella tietokoneella.\n4. Avaa Levynhallinta.\n5. Älä alusta jos tiedot ovat tärkeitä."}},
{id:"backup",p:{ru:["сделать резервную копию","как сделать backup","как сохранить данные","нужен бэкап"],en:["make a backup","how to back up computer","how to protect data","need a backup"],fi:["tee varmuuskopio","miten teen varmuuskopion","miten suojaan tiedot","tarvitsen varmuuskopion"]},k:{ru:["резервная копия","бэкап","backup"],en:["backup","back up"],fi:["varmuuskopio"]},a:{ru:"Для важных данных желательно иметь оригинал, копию на внешнем диске и ещё одну копию в облаке. Перед переустановкой Windows обязательно проверьте, что резервная копия действительно открывается.",en:"For important data keep the original, a copy on an external drive and another copy in cloud storage. Verify the backup before reinstalling Windows.",fi:"Tärkeistä tiedoista kannattaa pitää alkuperäinen, kopio ulkoisella levyllä ja toinen kopio pilvessä. Varmista varmuuskopio ennen Windowsin uudelleenasennusta."}},
{id:"keyboardMouse",p:{ru:["мышь не работает","клавиатура не работает","мышка не работает","курсор не двигается"],en:["mouse not working","keyboard not working","cursor not moving"],fi:["hiiri ei toimi","näppäimistö ei toimi","osoitin ei liiku"]},k:{ru:["мышь","мышка","клавиатура","курсор"],en:["mouse","keyboard","cursor"],fi:["hiiri","näppäimistö","osoitin"]},a:{ru:"Если мышь или клавиатура не работают:\n\n1. Переподключите устройство.\n2. Попробуйте другой USB.\n3. Для беспроводного устройства проверьте батарею.\n4. Проверьте Bluetooth/приёмник.\n5. Перезагрузите ПК.",en:"If mouse/keyboard does not work:\n\n1. Reconnect it.\n2. Try another USB.\n3. Check battery for wireless device.\n4. Check Bluetooth/receiver.\n5. Restart.",fi:"Jos hiiri/näppäimistö ei toimi:\n\n1. Kytke uudelleen.\n2. Kokeile toista USB-porttia.\n3. Tarkista paristo.\n4. Tarkista Bluetooth/vastaanotin.\n5. Käynnistä uudelleen."}},
{id:"battery",p:{ru:["ноутбук не заряжается","батарея не заряжается","зарядка не работает","аккумулятор быстро разряжается"],en:["laptop not charging","battery not charging","charger not working","battery drains quickly"],fi:["kannettava ei lataudu","akku ei lataudu","laturi ei toimi","akku tyhjenee nopeasti"]},k:{ru:["зарядка","батарея","аккумулятор"],en:["charging","charger","battery"],fi:["lataus","laturi","akku"]},a:{ru:"Если ноутбук не заряжается:\n\n1. Проверьте розетку и зарядное устройство.\n2. Переподключите кабель.\n3. Осмотрите разъём без разборки.\n4. Перезагрузите ноутбук.\n5. Если зарядка повреждена, сильно греется или пахнет гарью — прекратите использование.",en:"If laptop is not charging:\n\n1. Check outlet/charger.\n2. Reconnect cable.\n3. Inspect connector without opening laptop.\n4. Restart.\n5. Stop using a damaged/hot/burning-smell charger.",fi:"Jos kannettava ei lataudu:\n\n1. Tarkista pistorasia/laturi.\n2. Kytke kaapeli uudelleen.\n3. Tarkista liitin avaamatta konetta.\n4. Käynnistä uudelleen.\n5. Lopeta vaurioituneen/kuuman laturin käyttö."}}
];


const HOME_SUPPORT_KB=[{id:"appCrash",p:{ru:["программа вылетает","программа зависает","приложение не отвечает"],en:["app keeps crashing","program keeps crashing","app not responding","program freezes"],fi:["ohjelma kaatuu","sovellus ei vastaa","ohjelma jumittuu"]},k:{ru:["программа вылетает","программа зависает","приложение не отвечает"],en:["app keeps crashing","program keeps crashing","app not responding","program freezes"],fi:["ohjelma kaatuu","sovellus ei vastaa","ohjelma jumittuu"]},a:{ru:"Если программа зависает или вылетает:\n1. Ctrl+Shift+Esc → Task Manager → закройте только зависшую программу.\n2. Перезапустите ПК.\n3. Обновите программу и Windows.\n4. Если проблема только в одной программе — переустановите её с официального сайта.\n5. Если появляется код ошибки, напишите его ANITA.",en:"If an app freezes or crashes:\n1. Press Ctrl+Shift+Esc → Task Manager and close only the frozen app.\n2. Restart the PC.\n3. Update the app and Windows.\n4. If only one app is affected, reinstall it from the official source.\n5. If there is an error code, send it to ANITA.",fi:"Jos ohjelma jumittuu tai kaatuu:\n1. Ctrl+Shift+Esc → Tehtävienhallinta ja sulje vain jumittunut ohjelma.\n2. Käynnistä PC uudelleen.\n3. Päivitä ohjelma ja Windows.\n4. Jos vain yksi ohjelma oireilee, asenna se uudelleen virallisesta lähteestä.\n5. Lähetä mahdollinen virhekoodi ANITAlle."}},{id:"highCpu",p:{ru:["процессор 100","cpu 100","высокая загрузка процессора"],en:["cpu 100","cpu at 100","high cpu usage","processor usage high"],fi:["cpu 100","prosessori 100","suorittimen käyttö korkea"]},k:{ru:["процессор 100","cpu 100","высокая загрузка процессора"],en:["cpu 100","cpu at 100","high cpu usage","processor usage high"],fi:["cpu 100","prosessori 100","suorittimen käyttö korkea"]},a:{ru:"Если CPU постоянно 90–100%:\n1. Ctrl+Shift+Esc → Processes → сортировка по CPU.\n2. Посмотрите, какая знакомая программа создаёт нагрузку.\n3. Закройте ненужные приложения.\n4. Перезапустите ПК и установите обновления.\n5. Если неизвестный процесс постоянно грузит CPU — запустите Windows Security scan.\nНе завершайте случайные системные процессы.",en:"If CPU stays around 90–100%:\n1. Ctrl+Shift+Esc → Processes → sort by CPU.\n2. See which recognized app is using it.\n3. Close unnecessary apps.\n4. Restart and install updates.\n5. If an unknown process constantly uses CPU, run a Windows Security scan.\nDon't randomly end Windows system processes.",fi:"Jos CPU pysyy 90–100%:ssa:\n1. Ctrl+Shift+Esc → Prosessit → järjestä CPU:n mukaan.\n2. Tarkista mikä tuttu ohjelma kuormittaa.\n3. Sulje tarpeettomat ohjelmat.\n4. Käynnistä uudelleen ja päivitä.\n5. Jos tuntematon prosessi kuormittaa jatkuvasti, suorita Windows Security -tarkistus.\nÄlä lopeta satunnaisia järjestelmäprosesseja."}},{id:"highRam",p:{ru:["оперативная память 100","ram 100","озу заполнена","мало оперативной памяти"],en:["ram 100","memory usage high","ram is full","not enough ram"],fi:["ram 100","muisti täynnä","keskusmuistin käyttö korkea"]},k:{ru:["оперативная память 100","ram 100","озу заполнена","мало оперативной памяти"],en:["ram 100","memory usage high","ram is full","not enough ram"],fi:["ram 100","muisti täynnä","keskusmuistin käyttö korkea"]},a:{ru:"При высокой загрузке RAM:\n1. Task Manager → Processes → сортировка по Memory.\n2. Закройте лишние программы и вкладки браузера.\n3. Проверьте Startup apps.\n4. Перезапустите ПК, если память не освобождается.\n5. Если обычная работа постоянно использует 80–100%, возможно, RAM действительно недостаточно.",en:"For high RAM usage:\n1. Task Manager → Processes → sort by Memory.\n2. Close unnecessary apps and browser tabs.\n3. Check Startup apps.\n4. Restart if memory doesn't get released.\n5. If normal use constantly reaches 80–100%, the PC may genuinely need more RAM.",fi:"Jos RAM-muistin käyttö on korkea:\n1. Tehtävienhallinta → Prosessit → järjestä Muistin mukaan.\n2. Sulje tarpeettomat ohjelmat ja selainvälilehdet.\n3. Tarkista käynnistyssovellukset.\n4. Käynnistä uudelleen jos muisti ei vapaudu.\n5. Jos normaali käyttö vie jatkuvasti 80–100%, RAM-muistia voi olla liian vähän."}},{id:"disk100",p:{ru:["диск 100","диск загружен на 100"],en:["disk 100","disk at 100","100 percent disk usage"],fi:["levy 100","levyn käyttö 100"]},k:{ru:["диск 100","диск загружен на 100"],en:["disk 100","disk at 100","100 percent disk usage"],fi:["levy 100","levyn käyttö 100"]},a:{ru:"Если Disk в Task Manager постоянно 100%:\n1. Отсортируйте процессы по Disk.\n2. Дайте Windows Update или антивирусной проверке закончить работу.\n3. Перезапустите ПК.\n4. Проверьте свободное место и состояние диска.\n5. Старый HDD часто становится узким местом; SSD обычно заметно ускоряет систему.",en:"If Disk stays at 100% in Task Manager:\n1. Sort Processes by Disk.\n2. Let Windows Update or an antivirus scan finish.\n3. Restart the PC.\n4. Check free space and drive health.\n5. An old HDD is often the bottleneck; an SSD usually improves responsiveness a lot.",fi:"Jos Levy pysyy 100%:ssa:\n1. Järjestä prosessit Levyn mukaan.\n2. Anna Windows Updaten tai virustarkistuksen valmistua.\n3. Käynnistä PC uudelleen.\n4. Tarkista vapaa tila ja levyn kunto.\n5. Vanha HDD on usein pullonkaula; SSD nopeuttaa yleensä paljon."}},{id:"ethernet",p:{ru:["ethernet не работает","интернет по кабелю не работает","lan не работает"],en:["ethernet not working","wired internet not working","lan not working","network cable not working"],fi:["ethernet ei toimi","langallinen internet ei toimi","lan ei toimi"]},k:{ru:["ethernet не работает","интернет по кабелю не работает","lan не работает"],en:["ethernet not working","wired internet not working","lan not working","network cable not working"],fi:["ethernet ei toimi","langallinen internet ei toimi","lan ei toimi"]},a:{ru:"Если Ethernet не работает:\n1. Переподключите кабель с обеих сторон.\n2. Попробуйте другой LAN-порт роутера и другой кабель.\n3. Settings → Network & Internet → Ethernet.\n4. Перезапустите роутер и ПК.\n5. Если Wi-Fi работает, а Ethernet нет, вероятны кабель, порт или сетевой адаптер.",en:"If Ethernet isn't working:\n1. Reconnect the cable at both ends.\n2. Try another router LAN port and another cable.\n3. Settings → Network & Internet → Ethernet.\n4. Restart the router and PC.\n5. If Wi-Fi works but Ethernet doesn't, suspect the cable, port or network adapter.",fi:"Jos Ethernet ei toimi:\n1. Kytke kaapeli uudelleen molemmista päistä.\n2. Kokeile toista LAN-porttia ja kaapelia.\n3. Asetukset → Verkko ja Internet → Ethernet.\n4. Käynnistä reititin ja PC uudelleen.\n5. Jos Wi-Fi toimii mutta Ethernet ei, syy voi olla kaapelissa, portissa tai verkkosovittimessa."}},{id:"wifiPassword",p:{ru:["забыл пароль wifi","как посмотреть пароль wifi"],en:["forgot wifi password","how to see wifi password","what is my wifi password"],fi:["unohdin wifi salasanan","miten näen wifi salasanan"]},k:{ru:["забыл пароль wifi","как посмотреть пароль wifi"],en:["forgot wifi password","how to see wifi password","what is my wifi password"],fi:["unohdin wifi salasanan","miten näen wifi salasanan"]},a:{ru:"Для своей Wi-Fi сети сначала проверьте наклейку роутера или приложение провайдера. На уже подключённом Windows-ПК пароль можно посмотреть в свойствах сохранённой сети. ANITA не помогает получать пароли от чужих сетей без разрешения.",en:"For your own Wi-Fi network, first check the router label or ISP/router app. On a Windows PC already connected to that network, you can view the saved Wi-Fi password in the network properties. ANITA won't help obtain passwords for networks you don't own or have permission to use.",fi:"Omassa Wi-Fi-verkossa tarkista ensin reitittimen tarra tai operaattorin sovellus. Jo yhdistetyllä Windows-PC:llä tallennetun verkon salasana voidaan näyttää verkon ominaisuuksista. ANITA ei auta hankkimaan toisten verkkojen salasanoja ilman lupaa."}},{id:"headphones",p:{ru:["наушники не работают","нет звука в наушниках","компьютер не видит наушники"],en:["headphones not working","no sound in headphones","pc doesn't detect headphones"],fi:["kuulokkeet ei toimi","kuulokkeista ei kuulu ääntä"]},k:{ru:["наушники не работают","нет звука в наушниках","компьютер не видит наушники"],en:["headphones not working","no sound in headphones","pc doesn't detect headphones"],fi:["kuulokkeet ei toimi","kuulokkeista ei kuulu ääntä"]},a:{ru:"Если наушники не работают:\n1. Переподключите их или попробуйте другой порт.\n2. Нажмите значок громкости и выберите правильное Output device.\n3. Проверьте Mute и громкость.\n4. Для Bluetooth удалите устройство и подключите заново.\n5. Проверьте наушники на другом устройстве.",en:"If headphones don't work:\n1. Reconnect them or try another port.\n2. Click the volume icon and choose the correct Output device.\n3. Check Mute and volume.\n4. For Bluetooth, remove the device and pair again.\n5. Test the headphones on another device.",fi:"Jos kuulokkeet eivät toimi:\n1. Kytke ne uudelleen tai kokeile toista porttia.\n2. Valitse äänenvoimakkuuskuvakkeesta oikea toistolaite.\n3. Tarkista mykistys ja äänenvoimakkuus.\n4. Bluetoothissa poista laite ja parita uudelleen.\n5. Testaa kuulokkeet toisella laitteella."}},{id:"touchpad",p:{ru:["тачпад не работает","сенсорная панель не работает"],en:["touchpad not working","trackpad not working","laptop touchpad stopped working"],fi:["kosketuslevy ei toimi","touchpad ei toimi"]},k:{ru:["тачпад не работает","сенсорная панель не работает"],en:["touchpad not working","trackpad not working","laptop touchpad stopped working"],fi:["kosketuslevy ei toimi","touchpad ei toimi"]},a:{ru:"Если тачпад не работает:\n1. Проверьте Fn-клавишу с символом touchpad — его могли случайно отключить.\n2. Settings → Bluetooth & devices → Touchpad.\n3. Перезапустите ноутбук.\n4. Обновите драйвер с сайта производителя ноутбука.\n5. Временно можно подключить USB-мышь.",en:"If the touchpad isn't working:\n1. Check the Fn key with a touchpad icon — it may have been disabled accidentally.\n2. Settings → Bluetooth & devices → Touchpad.\n3. Restart the laptop.\n4. Update the driver from the laptop manufacturer's website.\n5. Use a USB mouse temporarily if needed.",fi:"Jos kosketuslevy ei toimi:\n1. Tarkista Fn-näppäin, jossa on touchpad-kuvake.\n2. Asetukset → Bluetooth ja laitteet → Kosketuslevy.\n3. Käynnistä kannettava uudelleen.\n4. Päivitä ajuri valmistajan sivulta.\n5. Tarvittaessa käytä USB-hiirtä väliaikaisesti."}},{id:"keyboardLayout",p:{ru:["клавиатура печатает не те буквы","неправильная раскладка","поменялся язык клавиатуры"],en:["keyboard types wrong characters","wrong keyboard layout","keyboard language changed"],fi:["näppäimistö kirjoittaa väärät merkit","väärä näppäimistöasettelu"]},k:{ru:["клавиатура печатает не те буквы","неправильная раскладка","поменялся язык клавиатуры"],en:["keyboard types wrong characters","wrong keyboard layout","keyboard language changed"],fi:["näppäimistö kirjoittaa väärät merkit","väärä näppäimistöasettelu"]},a:{ru:"Если клавиатура печатает не те символы:\n1. Нажмите Win+Space и выберите нужную раскладку.\n2. Settings → Time & language → Language & region → Keyboard.\n3. Удалите ненужные раскладки.\n4. Если неверно работает только одна клавиша — проверьте клавиатуру на другом ПК.",en:"If the keyboard types the wrong characters:\n1. Press Win+Space and choose the correct layout.\n2. Settings → Time & language → Language & region → Keyboard.\n3. Remove layouts you don't use.\n4. If only one key is wrong, test the keyboard on another PC.",fi:"Jos näppäimistö kirjoittaa vääriä merkkejä:\n1. Paina Win+Space ja valitse oikea asettelu.\n2. Asetukset → Aika ja kieli → Kieli ja alue → Näppäimistö.\n3. Poista tarpeettomat asettelut.\n4. Jos vain yksi näppäin toimii väärin, testaa näppäimistö toisella PC:llä."}},{id:"login",p:{ru:["забыл pin windows","забыл пароль windows","не могу войти в windows"],en:["forgot windows pin","forgot windows password","can't sign in to windows","pin not working"],fi:["unohdin windows pin","unohdin windows salasanan","en pääse windowsiin"]},k:{ru:["забыл pin windows","забыл пароль windows","не могу войти в windows"],en:["forgot windows pin","forgot windows password","can't sign in to windows","pin not working"],fi:["unohdin windows pin","unohdin windows salasanan","en pääse windowsiin"]},a:{ru:"Если не получается войти в Windows:\n1. Проверьте раскладку и Caps Lock.\n2. Выберите Sign-in options.\n3. Для Microsoft Account используйте официальное восстановление пароля Microsoft.\n4. Для PIN выберите I forgot my PIN, если доступно.\nНикогда не отправляйте ANITA пароль, PIN или коды подтверждения.",en:"If you can't sign in to Windows:\n1. Check keyboard layout and Caps Lock.\n2. Choose Sign-in options.\n3. For a Microsoft Account, use Microsoft's official password recovery.\n4. For a PIN, choose I forgot my PIN if available.\nNever send ANITA your password, PIN or verification codes.",fi:"Jos Windowsiin ei pääse:\n1. Tarkista näppäimistöasettelu ja Caps Lock.\n2. Valitse Kirjautumisasetukset.\n3. Microsoft-tilille käytä Microsoftin virallista salasanan palautusta.\n4. PIN-koodille valitse Unohdin PIN-koodini, jos saatavilla.\nÄlä lähetä ANITAlle salasanaa, PIN-koodia tai vahvistuskoodeja."}},{id:"onedrive",p:{ru:["onedrive не синхронизирует","onedrive красный крест"],en:["onedrive not syncing","onedrive red x","files not uploading to onedrive"],fi:["onedrive ei synkronoi","onedrive punainen rasti"]},k:{ru:["onedrive не синхронизирует","onedrive красный крест"],en:["onedrive not syncing","onedrive red x","files not uploading to onedrive"],fi:["onedrive ei synkronoi","onedrive punainen rasti"]},a:{ru:"Если OneDrive не синхронизируется:\n1. Нажмите значок OneDrive возле часов и прочитайте статус/ошибку.\n2. Проверьте интернет и свободное место OneDrive/диска.\n3. Pause syncing → Resume syncing.\n4. Перезапустите OneDrive или ПК.\n5. Убедитесь, что вошли в правильный Microsoft Account.",en:"If OneDrive isn't syncing:\n1. Click the OneDrive icon near the clock and read the status/error.\n2. Check internet and free OneDrive/disk space.\n3. Pause syncing → Resume syncing.\n4. Restart OneDrive or the PC.\n5. Make sure you're signed into the correct Microsoft Account.",fi:"Jos OneDrive ei synkronoi:\n1. Napsauta OneDrive-kuvaketta kellon vieressä ja tarkista tila/virhe.\n2. Tarkista internet ja vapaa tila.\n3. Keskeytä synkronointi → jatka.\n4. Käynnistä OneDrive tai PC uudelleen.\n5. Varmista että käytössä on oikea Microsoft-tili."}},{id:"phoneConnect",p:{ru:["компьютер не видит телефон","телефон не подключается к компьютеру","перенести фото с телефона"],en:["computer doesn't see my phone","phone not connecting to pc","transfer photos from phone to pc"],fi:["tietokone ei tunnista puhelinta","puhelin ei yhdisty tietokoneeseen"]},k:{ru:["компьютер не видит телефон","телефон не подключается к компьютеру","перенести фото с телефона"],en:["computer doesn't see my phone","phone not connecting to pc","transfer photos from phone to pc"],fi:["tietokone ei tunnista puhelinta","puhelin ei yhdisty tietokoneeseen"]},a:{ru:"Если ПК не видит телефон:\n1. Разблокируйте телефон после подключения.\n2. Попробуйте другой USB-кабель — некоторые только заряжают.\n3. Android: выберите USB mode → File transfer/MTP.\n4. iPhone: подтвердите Trust this computer.\n5. Попробуйте другой USB-порт.",en:"If the PC doesn't see your phone:\n1. Unlock the phone after connecting it.\n2. Try another USB cable — some are charge-only.\n3. Android: choose USB mode → File transfer/MTP.\n4. iPhone: approve Trust this computer.\n5. Try another USB port.",fi:"Jos PC ei tunnista puhelinta:\n1. Avaa puhelimen lukitus.\n2. Kokeile toista USB-kaapelia — osa vain lataa.\n3. Android: valitse USB-tila → Tiedostonsiirto/MTP.\n4. iPhone: hyväksy Trust this computer.\n5. Kokeile toista USB-porttia."}},{id:"tvHdmi",p:{ru:["подключить компьютер к телевизору","нет изображения на телевизоре hdmi"],en:["connect computer to tv","no picture on tv hdmi","laptop to tv hdmi"],fi:["yhdistä tietokone televisioon","ei kuvaa tv hdmi"]},k:{ru:["подключить компьютер к телевизору","нет изображения на телевизоре hdmi"],en:["connect computer to tv","no picture on tv hdmi","laptop to tv hdmi"],fi:["yhdistä tietokone televisioon","ei kuvaa tv hdmi"]},a:{ru:"Для подключения к телевизору по HDMI:\n1. Подключите HDMI.\n2. На TV выберите правильный HDMI Input.\n3. В Windows нажмите Win+P → Duplicate или Extend.\n4. Если изображения нет — попробуйте другой HDMI-порт/кабель.\n5. Для звука выберите телевизор как Output device.",en:"To connect a PC to a TV over HDMI:\n1. Connect HDMI.\n2. Select the correct HDMI input on the TV.\n3. In Windows press Win+P → Duplicate or Extend.\n4. If there is no picture, try another HDMI port/cable.\n5. For audio, choose the TV as the Output device.",fi:"PC:n liittäminen TV:hen HDMI:llä:\n1. Kytke HDMI.\n2. Valitse TV:stä oikea HDMI-tulo.\n3. Windowsissa Win+P → Monista tai Laajenna.\n4. Jos kuvaa ei tule, kokeile toista HDMI-porttia/kaapelia.\n5. Valitse ääntä varten TV toistolaitteeksi."}},{id:"browserPopups",p:{ru:["в браузере реклама","всплывают окна","браузер открывает рекламу"],en:["browser popups","random ads in browser","browser opens ads by itself"],fi:["selaimessa mainoksia","ponnahdusikkunoita jatkuvasti"]},k:{ru:["в браузере реклама","всплывают окна","браузер открывает рекламу"],en:["browser popups","random ads in browser","browser opens ads by itself"],fi:["selaimessa mainoksia","ponnahdusikkunoita jatkuvasti"]},a:{ru:"Если браузер показывает подозрительные окна:\n1. Не нажимайте «ваш компьютер заражён».\n2. Проверьте Site notifications и удалите неизвестные разрешения.\n3. Удалите неизвестные extensions.\n4. Запустите полную проверку Windows Security.\n5. Если реклама появляется даже вне браузера — сообщите ANITA.",en:"If the browser shows suspicious pop-ups:\n1. Don't click “your computer is infected” messages.\n2. Check site Notification permissions and remove unknown sites.\n3. Remove unknown extensions.\n4. Run a full Windows Security scan.\n5. If ads appear outside the browser too, tell ANITA.",fi:"Jos selain näyttää epäilyttäviä ponnahdusikkunoita:\n1. Älä napsauta “tietokoneesi on saastunut” -viestejä.\n2. Tarkista sivustojen ilmoitusluvat.\n3. Poista tuntemattomat laajennukset.\n4. Suorita Windows Securityn täysi tarkistus.\n5. Jos mainoksia näkyy myös selaimen ulkopuolella, kerro ANITAlle."}},{id:"fileDeleted",p:{ru:["удалил файл случайно","как восстановить удаленный файл","файл пропал"],en:["accidentally deleted file","recover deleted file","lost a file"],fi:["poistin tiedoston vahingossa","palauta poistettu tiedosto"]},k:{ru:["удалил файл случайно","как восстановить удаленный файл","файл пропал"],en:["accidentally deleted file","recover deleted file","lost a file"],fi:["poistin tiedoston vahingossa","palauta poistettu tiedosto"]},a:{ru:"Если файл удалён случайно:\n1. Проверьте Recycle Bin.\n2. Если файл был в OneDrive — проверьте корзину OneDrive и Version history.\n3. Если файл очень важен, не записывайте много новых данных на тот же диск.\n4. При неисправном диске лучше остановиться и обратиться к специалисту по восстановлению данных.",en:"If a file was accidentally deleted:\n1. Check the Recycle Bin.\n2. If it was in OneDrive, check OneDrive's recycle bin and Version history.\n3. If the file is very important, avoid writing lots of new data to that drive.\n4. If the drive itself is failing, stop and consider professional data recovery.",fi:"Jos tiedosto poistettiin vahingossa:\n1. Tarkista Roskakori.\n2. Jos tiedosto oli OneDrivessa, tarkista OneDriven roskakori ja versiohistoria.\n3. Jos tiedosto on tärkeä, vältä uuden datan kirjoittamista samalle levylle.\n4. Jos levy on viallinen, lopeta käyttö ja harkitse ammattilaista."}},{id:"shutdown",p:{ru:["компьютер не выключается","windows зависает при выключении"],en:["computer won't shut down","windows stuck shutting down","pc not turning off"],fi:["tietokone ei sammu","windows jumittuu sammutettaessa"]},k:{ru:["компьютер не выключается","windows зависает при выключении"],en:["computer won't shut down","windows stuck shutting down","pc not turning off"],fi:["tietokone ei sammu","windows jumittuu sammutettaessa"]},a:{ru:"Если Windows не выключается:\n1. Подождите несколько минут, особенно если идёт Update.\n2. Закройте зависшие программы через Task Manager.\n3. Попробуйте Start → Power → Restart, затем Shut down.\n4. Установите Windows Update.\n5. Удерживайте кнопку Power только как последний вариант — несохранённые данные будут потеряны.",en:"If Windows won't shut down:\n1. Wait a few minutes, especially if an update is running.\n2. Close frozen apps with Task Manager.\n3. Try Start → Power → Restart, then Shut down.\n4. Install Windows updates.\n5. Hold the Power button only as a last resort — unsaved data will be lost.",fi:"Jos Windows ei sammu:\n1. Odota muutama minuutti, varsinkin jos päivitys on käynnissä.\n2. Sulje jumittuneet ohjelmat Tehtävienhallinnasta.\n3. Kokeile ensin Käynnistä uudelleen ja sitten Sammuta.\n4. Asenna Windows-päivitykset.\n5. Pidä virtapainiketta pohjassa vain viimeisenä keinona — tallentamattomat tiedot häviävät."}},{id:"randomRestart",p:{ru:["компьютер сам перезагружается","пк внезапно перезапускается"],en:["computer randomly restarts","pc keeps restarting","computer reboots by itself"],fi:["tietokone käynnistyy itsestään uudelleen","pc käynnistyy satunnaisesti uudelleen"]},k:{ru:["компьютер сам перезагружается","пк внезапно перезапускается"],en:["computer randomly restarts","pc keeps restarting","computer reboots by itself"],fi:["tietokone käynnistyy itsestään uudelleen","pc käynnistyy satunnaisesti uudelleen"]},a:{ru:"Если ПК сам перезагружается:\n1. Обратите внимание, происходит ли это под нагрузкой или случайно.\n2. Проверьте температуры CPU/GPU.\n3. Установите Windows Update и драйверы.\n4. Проверьте Event Viewer/на наличие BSOD-кода, если он появляется.\n5. Если перезапуск сопровождается запахом, искрами или нестабильным питанием — выключите ПК и обратитесь к специалисту.",en:"If the PC randomly restarts:\n1. Notice whether it happens under load or at random.\n2. Check CPU/GPU temperatures.\n3. Install Windows updates and drivers.\n4. Note any BSOD/error code or Event Viewer clue.\n5. If restarts come with a burning smell, sparks or unstable power, turn the PC off and contact a specialist.",fi:"Jos PC käynnistyy satunnaisesti uudelleen:\n1. Huomaa tapahtuuko se kuormituksessa vai satunnaisesti.\n2. Tarkista CPU/GPU-lämpötilat.\n3. Asenna Windows-päivitykset ja ajurit.\n4. Kirjaa mahdollinen BSOD-/virhekoodi.\n5. Jos mukana on palaneen hajua, kipinöitä tai epävakaata virtaa, sammuta PC ja ota yhteyttä asiantuntijaan."}},{id:"noBootDevice",p:{ru:["no boot device","boot device not found","операционная система не найдена","загрузочное устройство не найдено"],en:["no boot device","boot device not found","operating system not found","no bootable device"],fi:["no boot device","käynnistyslaitetta ei löydy","operating system not found"]},k:{ru:["no boot device","boot device not found","операционная система не найдена","загрузочное устройство не найдено"],en:["no boot device","boot device not found","operating system not found","no bootable device"],fi:["no boot device","käynnistyslaitetta ei löydy","operating system not found"]},a:{ru:"Сообщение No boot device / Operating system not found означает, что ПК не находит Windows-диск.\n1. Перезагрузите ПК и отключите ненужные USB-накопители.\n2. Проверьте в BIOS/UEFI, виден ли системный SSD/HDD.\n3. Если диск не виден — возможна проблема диска или подключения.\n4. Если диск виден, но Windows не запускается — может потребоваться Startup Repair или восстановление загрузчика.\nЕсли на диске важные данные, не форматируйте его.",en:"No boot device / Operating system not found means the PC cannot find the Windows drive.\n1. Restart and disconnect unnecessary USB storage.\n2. Check BIOS/UEFI to see whether the system SSD/HDD is detected.\n3. If the drive isn't detected, the drive or its connection may be failing.\n4. If it is detected but Windows won't boot, Startup Repair or boot recovery may be needed.\nDon't format the drive if it contains important data.",fi:"No boot device / Operating system not found tarkoittaa, ettei PC löydä Windows-levyä.\n1. Käynnistä uudelleen ja irrota tarpeettomat USB-levyt.\n2. Tarkista BIOS/UEFI:sta näkyykö järjestelmän SSD/HDD.\n3. Jos levy ei näy, levy tai liitäntä voi olla viallinen.\n4. Jos levy näkyy mutta Windows ei käynnisty, Startup Repair voi olla tarpeen.\nÄlä alusta levyä jos siellä on tärkeitä tietoja."}},{id:"startupRepair",p:{ru:["automatic repair loop","автоматическое восстановление по кругу","windows startup repair loop"],en:["automatic repair loop","startup repair loop","preparing automatic repair forever"],fi:["automatic repair loop","windows korjaussilmukka"]},k:{ru:["automatic repair loop","автоматическое восстановление по кругу","windows startup repair loop"],en:["automatic repair loop","startup repair loop","preparing automatic repair forever"],fi:["automatic repair loop","windows korjaussilmukka"]},a:{ru:"Если Windows зациклился на Automatic Repair:\n1. Дайте одной попытке восстановления завершиться.\n2. Advanced options → Troubleshoot → Startup Repair.\n3. Если не помогает, попробуйте System Restore, если есть точка восстановления.\n4. Не выбирайте Reset/Remove everything, пока важные данные не сохранены.\n5. Если диск издаёт необычные звуки или постоянно пропадает — прекратите попытки и сохраните данные через специалиста.",en:"If Windows is stuck in an Automatic Repair loop:\n1. Let one repair attempt finish.\n2. Advanced options → Troubleshoot → Startup Repair.\n3. If that fails, try System Restore if a restore point exists.\n4. Don't choose Reset/Remove everything before important data is backed up.\n5. If the drive makes unusual noises or disappears, stop and protect the data first.",fi:"Jos Windows jää Automatic Repair -silmukkaan:\n1. Anna yhden korjausyrityksen valmistua.\n2. Advanced options → Troubleshoot → Startup Repair.\n3. Jos se ei auta, kokeile System Restorea jos palautuspiste löytyy.\n4. Älä valitse Reset/Remove everything ennen varmuuskopiota.\n5. Jos levy pitää outoa ääntä tai katoaa, lopeta ja suojaa tiedot ensin."}},{id:"screenFlicker",p:{ru:["экран мерцает","монитор мигает"],en:["screen flickering","monitor flickers","display keeps flashing"],fi:["näyttö vilkkuu","näyttö välkkyy"]},k:{ru:["экран мерцает","монитор мигает"],en:["screen flickering","monitor flickers","display keeps flashing"],fi:["näyttö vilkkuu","näyttö välkkyy"]},a:{ru:"Если экран мерцает:\n1. Переподключите HDMI/DisplayPort и питание.\n2. Попробуйте другой кабель или порт.\n3. Settings → System → Display → Advanced display → проверьте refresh rate.\n4. Обновите/переустановите драйвер видеокарты.\n5. Если мерцание есть и на другом ПК — вероятнее монитор или кабель.",en:"If the screen flickers:\n1. Reconnect HDMI/DisplayPort and power.\n2. Try another cable or port.\n3. Settings → System → Display → Advanced display → check refresh rate.\n4. Update/reinstall the graphics driver.\n5. If it also flickers on another PC, suspect the monitor or cable.",fi:"Jos näyttö vilkkuu:\n1. Kytke HDMI/DisplayPort ja virta uudelleen.\n2. Kokeile toista kaapelia tai porttia.\n3. Asetukset → Järjestelmä → Näyttö → Lisänäyttö → tarkista virkistystaajuus.\n4. Päivitä/asennna grafiikka-ajuri uudelleen.\n5. Jos se vilkkuu myös toisella PC:llä, epäile näyttöä tai kaapelia."}},{id:"resolution",p:{ru:["неправильное разрешение","все на экране слишком большое","экран растянут"],en:["wrong screen resolution","everything too big on screen","screen stretched","display scaling wrong"],fi:["väärä resoluutio","kaikki liian isoa näytöllä","kuva venynyt"]},k:{ru:["неправильное разрешение","все на экране слишком большое","экран растянут"],en:["wrong screen resolution","everything too big on screen","screen stretched","display scaling wrong"],fi:["väärä resoluutio","kaikki liian isoa näytöllä","kuva venynyt"]},a:{ru:"Если изображение слишком крупное, мелкое или растянуто:\n1. Settings → System → Display.\n2. Выберите Resolution с пометкой Recommended.\n3. Проверьте Scale.\n4. Если нужного разрешения нет — обновите драйвер видеокарты.",en:"If everything looks too big, small or stretched:\n1. Settings → System → Display.\n2. Choose the Resolution marked Recommended.\n3. Check Scale.\n4. If the correct resolution is missing, update the graphics driver.",fi:"Jos kuva on liian suuri, pieni tai venynyt:\n1. Asetukset → Järjestelmä → Näyttö.\n2. Valitse Suositeltu resoluutio.\n3. Tarkista Skaalaus.\n4. Jos oikea resoluutio puuttuu, päivitä grafiikka-ajuri."}},{id:"downloads",p:{ru:["файл не скачивается","загрузка зависла"],en:["file won't download","download stuck","can't download file"],fi:["tiedosto ei lataudu","lataus jumissa"]},k:{ru:["файл не скачивается","загрузка зависла"],en:["file won't download","download stuck","can't download file"],fi:["tiedosto ei lataudu","lataus jumissa"]},a:{ru:"Если файл не скачивается:\n1. Проверьте интернет и свободное место.\n2. Попробуйте другой браузер или Private/Incognito.\n3. Проверьте Downloads и сообщение о блокировке.\n4. Если Windows Security блокирует файл, не отключайте защиту вслепую — сначала убедитесь, что источник официальный.",en:"If a file won't download:\n1. Check internet and free disk space.\n2. Try another browser or Private/Incognito mode.\n3. Check Downloads and any blocking message.\n4. If Windows Security blocks it, don't blindly disable protection — verify the source is legitimate first.",fi:"Jos tiedosto ei lataudu:\n1. Tarkista internet ja vapaa levytila.\n2. Kokeile toista selainta tai yksityistä tilaa.\n3. Tarkista Lataukset ja mahdollinen estoviesti.\n4. Jos Windows Security estää tiedoston, älä poista suojausta sokkona — varmista lähde ensin."}},{id:"gamingFps",p:{ru:["низкий fps","игра тормозит","игра лагает"],en:["low fps","game is laggy","fps drops","game stutters"],fi:["alhainen fps","peli lagaa","fps laskee"]},k:{ru:["низкий fps","игра тормозит","игра лагает"],en:["low fps","game is laggy","fps drops","game stutters"],fi:["alhainen fps","peli lagaa","fps laskee"]},a:{ru:"Если в играх низкий FPS:\n1. Подключите ноутбук к питанию.\n2. Закройте лишние программы.\n3. Проверьте температуры CPU/GPU.\n4. Обновите драйвер видеокарты с NVIDIA/AMD/Intel.\n5. Уменьшите тяжёлые графические настройки.\n6. Убедитесь, что игра использует дискретную GPU, если она есть.",en:"For low FPS in games:\n1. Plug a laptop into power.\n2. Close unnecessary apps.\n3. Check CPU/GPU temperatures.\n4. Update the graphics driver from NVIDIA/AMD/Intel.\n5. Lower demanding graphics settings.\n6. Make sure the game uses the dedicated GPU if available.",fi:"Jos peleissä on matala FPS:\n1. Kytke kannettava verkkovirtaan.\n2. Sulje tarpeettomat ohjelmat.\n3. Tarkista CPU/GPU-lämpötilat.\n4. Päivitä näytönohjaimen ajuri NVIDIA/AMD/Intel-sivulta.\n5. Laske raskaita grafiikka-asetuksia.\n6. Varmista että peli käyttää erillistä GPU:ta jos sellainen on."}}];knowledge.push(...HOME_SUPPORT_KB);
const TECH_TERMS={
cpu:{aliases:{ru:["cpu","процессор","проц","центральный процессор","загрузка процессора","нагрузка процессора","cpu 100"],en:["cpu","processor","central processor","cpu usage","processor usage","cpu 100"],fi:["cpu","prosessori","suoritin","prosessorin käyttö","suorittimen käyttö"]},answers:{ru:"CPU — центральный процессор компьютера. Если он загружен на 90–100%: откройте Ctrl+Shift+Esc → Процессы, отсортируйте по CPU, найдите процесс с высокой нагрузкой, закройте ненужные программы, перезагрузите ПК и выполните Windows Security. Если нагрузка остаётся высокой без программ — нужна дополнительная диагностика.",en:"CPU is the main processor. If usage stays at 90–100%, open Task Manager, sort by CPU, identify the process, close unnecessary apps, restart and run Windows Security. Persistent high idle usage needs further diagnostics.",fi:"CPU tarkoittaa suoritinta. Jos käyttö on 90–100 %, avaa Tehtävienhallinta, järjestä CPU-käytön mukaan, tarkista kuormittava prosessi, sulje tarpeettomat ohjelmat ja käynnistä uudelleen."}},
ram:{aliases:{ru:["ram","озу","оперативная память","оперативка","ram заполнена","мало оперативной памяти"],en:["ram","memory","system memory","ram usage","ram full","not enough ram"],fi:["ram","muisti","keskusmuisti","ram-muisti","muisti täynnä"]},answers:{ru:"RAM — оперативная память. Если она почти полностью занята: Ctrl+Shift+Esc → Процессы → Память, закройте ненужные программы/вкладки, проверьте автозагрузку и перезагрузите ПК. Постоянные 80–100% могут означать, что RAM недостаточно.",en:"RAM is working memory. If nearly full, use Task Manager → Memory, close unnecessary apps/tabs, check startup apps and restart. Persistent 80–100% may mean you need more RAM.",fi:"RAM on työmuisti. Jos se on lähes täynnä, tarkista Tehtävienhallinta → Muisti, sulje tarpeettomat ohjelmat ja välilehdet, tarkista käynnistysohjelmat ja käynnistä uudelleen."}},
motherboard:{aliases:{ru:["материнская плата","материнка","системная плата","motherboard"],en:["motherboard","mainboard","system board"],fi:["emolevy","motherboard"]},answers:{ru:"Материнская плата — основная плата компьютера, к которой подключаются CPU, RAM, видеокарта, накопители и другие устройства. Симптомы её неисправности могут быть похожи на неисправности других компонентов, поэтому точный вывод обычно требует физической диагностики.",en:"The motherboard is the main circuit board connecting CPU, RAM, graphics, storage and other devices. Its symptoms can mimic other faults, so physical diagnostics may be needed.",fi:"Emolevy on tietokoneen pääpiirilevy, johon CPU, RAM, näytönohjain ja tallennuslaitteet liittyvät. Oireet voivat muistuttaa muita vikoja, joten tarkka diagnoosi voi vaatia fyysisen tarkastuksen."}},
gpu:{aliases:{ru:["gpu","видеокарта","видео карта","графическая карта","графический процессор","видеочип"],en:["gpu","graphics card","video card","graphics processor"],fi:["gpu","näytönohjain","grafiikkakortti"]},answers:{ru:"GPU — графический процессор, обычно видеокарта. При проблемах проверьте кабель и видеовыход, драйвер видеокарты, а в Диспетчере задач → Производительность → GPU — нагрузку. Артефакты, полосы или пропадание изображения могут указывать на аппаратную неисправность.",en:"GPU is the graphics processor/graphics card. Check monitor cable/output, graphics driver and Task Manager → Performance → GPU. Artifacts, lines or disappearing image may indicate hardware failure.",fi:"GPU tarkoittaa grafiikkaprosessoria eli näytönohjainta. Tarkista kaapeli, videolähtö, ajuri ja GPU-kuormitus. Grafiikkavirheet tai kuvan katoaminen voivat viitata laitevikaan."}},
psu:{aliases:{ru:["psu","блок питания","силовой блок","источник питания","питальник"],en:["psu","power supply","power supply unit"],fi:["psu","virtalähde","tietokoneen virtalähde"]},answers:{ru:"PSU — блок питания компьютера. Возможные признаки проблемы: ПК не включается, внезапно выключается, перезагружается под нагрузкой, появляется необычный шум или запах гари. Не открывайте блок питания самостоятельно. При дыме, искрах или запахе гари отключите ПК от сети и обратитесь в сервис.",en:"PSU is the computer power supply. Possible signs: no power, sudden shutdowns, load-related restarts, unusual noise or burning smell. Do not open it yourself. Unplug the computer if there is smoke, sparks or burning smell.",fi:"PSU tarkoittaa virtalähdettä. Oireita voivat olla käynnistymättömyys, äkilliset sammumiset, uudelleenkäynnistykset kuormituksessa, ääni tai palaneen haju. Älä avaa virtalähdettä itse."}}
};


const SMALLTALK=[
{p:["hi","hello","hey","hiya","hi anita","hello anita","hey anita","good morning","good afternoon","good evening","привет","привет анита","здравствуй","здравствуйте","доброе утро","добрый день","добрый вечер","hei","moi","moikka","terve","hei anita","moi anita","hyvää huomenta","hyvää päivää","hyvää iltaa"],a:{ru:["Привет! Я ANITA 👋 Чем могу помочь — с компьютером или просто хочешь немного поболтать?","Привет 😊 Я здесь. Рассказывай, что случилось.","Привет! Рада тебя видеть. Что сегодня нужно решить?"],en:["Hi! I'm ANITA 👋 How can I help — computer trouble or just a little chat?","Hey 😊 I'm here. Tell me what's going on.","Hi! Nice to see you. What can I help you with today?"],fi:["Hei! Olen ANITA 👋 Miten voin auttaa — tietokoneongelma vai jutellaanko hetki?","Moi 😊 Olen täällä. Kerro mitä tapahtui.","Hei! Kiva nähdä sinua. Missä voin auttaa tänään?"]}},
{p:["how are you","how are you anita","how r u","how are u","are you ok","you good","what's up","whats up","how is it going","how's it going","как дела","как ты","как дела анита","как поживаешь","ты как","что нового","mitä kuuluu","miten menee","kuinka voit","mitä kuuluu anita"],a:{ru:["У меня всё отлично 😊 Готова помогать. А как у тебя дела?","Спасибо, что спросил! У ANITA всё работает штатно 😄 Как ты?","Хорошо 😊 Я на месте и готова к IT-приключениям. Что у тебя нового?"],en:["I'm doing great 😊 Ready to help. How are you?","Thanks for asking! All ANITA systems are operational 😄 How about you?","I'm good 😊 Here and ready for some IT adventures. What's new with you?"],fi:["Minulle kuuluu hyvää 😊 Valmiina auttamaan. Mitä sinulle kuuluu?","Kiitos kun kysyit! ANITAn järjestelmät toimivat 😄 Entä sinulla?","Hyvin menee 😊 Olen täällä ja valmiina IT-seikkailuihin. Mitä kuuluu?"]}},
{p:["can you help","can you help me","help me","i need help","could you help","please help","i have a problem","got a problem","поможешь","можешь помочь","помоги","помоги мне","мне нужна помощь","у меня проблема","можешь мне помочь","voitko auttaa","auta minua","tarvitsen apua","minulla on ongelma","voisitko auttaa"],a:{ru:["Конечно 😊 Опиши проблему своими словами. Что именно не работает?","Да, для этого я здесь. Расскажи всё как есть — технические термины знать не обязательно.","Постараюсь. Напиши, с чем проблема: компьютер, Windows, программа, интернет, монитор, принтер или что-то другое?"],en:["Of course 😊 Describe the problem in your own words. What isn't working?","Yes — that's what I'm here for. Just tell me what happened; you don't need technical terms.","I'll try. Is it the computer, Windows, an app, internet, monitor, printer, or something else?"],fi:["Totta kai 😊 Kuvaile ongelma omin sanoin. Mikä ei toimi?","Kyllä — sitä varten olen täällä. Kerro mitä tapahtui; teknisiä termejä ei tarvitse tietää.","Yritän auttaa. Liittyykö ongelma tietokoneeseen, Windowsiin, ohjelmaan, internetiin, näyttöön, tulostimeen vai johonkin muuhun?"]}},
{p:["who are you","what are you","are you ai","are you an ai","are you a bot","are you human","are you real","tell me about yourself","кто ты","что ты такое","ты ии","ты искусственный интеллект","ты бот","ты человек","ты настоящая","расскажи о себе","kuka olet","mikä olet","oletko tekoäly","oletko botti","oletko ihminen","kerro itsestäsi"],a:{ru:["Я ANITA — Alex Node IT Assistance 😊 Цифровой IT-помощник Alex Node. Я работаю на базе заранее подготовленных ответов и диагностических сценариев, а не генеративного ИИ.","Я ANITA. Помогаю разбираться с типичными компьютерными проблемами. Под капотом — большая база подготовленных сценариев и логика распознавания сообщений."],en:["I'm ANITA — Alex Node IT Assistance 😊 Alex Node's digital IT helper. I use prepared replies and troubleshooting flows rather than generative AI.","I'm ANITA. I help with common computer problems using a large library of prepared troubleshooting scenarios and message matching."],fi:["Olen ANITA — Alex Node IT Assistance 😊 Alex Noden digitaalinen IT-apuri. Käytän valmiita vastauksia ja vianmäärityspolkuja generatiivisen tekoälyn sijaan.","Olen ANITA. Autan tavallisissa tietokoneongelmissa valmiiden tukiskenaarioiden ja viestien tunnistuksen avulla."]}},
{p:["what is your name","your name","what should i call you","как тебя зовут","твое имя","твоё имя","как тебя называть","mikä sinun nimesi on","mikä on nimesi","miten kutsun sinua"],a:{ru:["Меня зовут ANITA 😊 Это сокращение от Alex Node IT Assistance.","ANITA. Приятно познакомиться 😊 Полностью — Alex Node IT Assistance."],en:["My name is ANITA 😊 It stands for Alex Node IT Assistance.","ANITA. Nice to meet you 😊 In full: Alex Node IT Assistance."],fi:["Nimeni on ANITA 😊 Se tulee sanoista Alex Node IT Assistance.","ANITA. Hauska tutustua 😊 Koko nimi on Alex Node IT Assistance."]}},
{p:["what can you do","what do you do","what can you help with","your functions","your capabilities","что ты умеешь","что умеешь","чем можешь помочь","твои функции","твои возможности","mitä osaat","mitä voit tehdä","missä voit auttaa"],a:{ru:["Я помогаю с Windows, программами, интернетом и Wi-Fi, мониторами, принтерами, звуком, Bluetooth, драйверами, USB, дисками, резервными копиями и базовой диагностикой оборудования. Просто опиши проблему обычными словами.","Я занимаюсь первичной IT-диагностикой: пытаюсь понять проблему, предлагаю безопасные шаги и при необходимости направляю к специалисту."],en:["I can help with Windows, software, internet and Wi-Fi, monitors, printers, audio, Bluetooth, drivers, USB, storage, backups and basic hardware troubleshooting. Just describe the issue normally.","I provide first-line IT troubleshooting: I identify the likely issue, suggest safe steps and, when needed, point you to a specialist."],fi:["Voin auttaa Windowsin, ohjelmien, internetin ja Wi-Fin, näyttöjen, tulostimien, äänen, Bluetoothin, ajureiden, USB:n, tallennustilan, varmuuskopioiden ja laitteiston perusvianmäärityksen kanssa.","Teen ensivaiheen IT-vianmääritystä: tunnistan todennäköisen ongelman, ehdotan turvallisia vaiheita ja tarvittaessa ohjaan asiantuntijalle."]}},
{p:["thanks","thank you","thx","ty","thank you anita","thanks anita","спасибо","спс","благодарю","спасибо анита","kiitos","kiitti","kiitos anita"],a:{ru:["Пожалуйста 😊 Рада помочь!","Всегда пожалуйста! Если появится ещё вопрос — пиши.","Не за что 😊 Для этого ANITA и здесь."],en:["You're welcome 😊 Happy to help!","Anytime! If something else comes up, just ask.","You're welcome 😊 That's what ANITA is here for."],fi:["Ole hyvä 😊 Mukava auttaa!","Ei mitään! Jos tulee muuta kysyttävää, kirjoita vain.","Ole hyvä 😊 Sitä varten ANITA on täällä."]}},
{p:["bye","goodbye","see you","see ya","later","good night","have a nice day","пока","до свидания","до встречи","спокойной ночи","хорошего дня","näkemiin","heippa","nähdään","hyvää yötä","hyvää päivänjatkoa"],a:{ru:["Пока! 👋 Если компьютер снова решит устроить сюрприз — ты знаешь, где меня найти 😄","До встречи! Хорошего дня и поменьше ошибок Windows 😊","Пока 😊 Возвращайся, если понадобится помощь."],en:["Bye! 👋 If your computer decides to surprise you again, you know where to find me 😄","See you! Have a great day and may Windows behave itself 😊","Bye 😊 Come back whenever you need help."],fi:["Heippa! 👋 Jos tietokone päättää taas yllättää, tiedät mistä minut löytää 😄","Nähdään! Hyvää päivänjatkoa ja toivottavasti Windows käyttäytyy 😊","Moikka 😊 Tule takaisin, jos tarvitset apua."]}},
{p:["nice to meet you","pleased to meet you","glad to meet you","приятно познакомиться","рада познакомиться","рад познакомиться","hauska tutustua","mukava tavata"],a:{ru:["Взаимно 😊 Теперь знакомы. Если техника начнёт капризничать — обращайся.","Мне тоже приятно 😊 Чем могу быть полезна?"],en:["Nice to meet you too 😊 Now we know each other. If your tech starts misbehaving, just ask.","Likewise 😊 What can I help you with?"],fi:["Hauska tutustua myös 😊 Nyt tunnemme toisemme. Jos tekniikka temppuilee, kysy vain.","Samoin 😊 Missä voin auttaa?"]}},
{p:["are you smart","are you clever","do you know everything","ты умная","ты все знаешь","ты всё знаешь","ты много знаешь","oletko älykäs","tiedätkö kaiken"],a:{ru:["Я знаю довольно много типичных IT-ситуаций, но не всё 😊 Если не смогу уверенно определить проблему, честно скажу об этом.","В IT я стараюсь быть полезной 😄 Но всезнайкой не притворяюсь: если нужного сценария нет, попрошу детали или предложу специалиста."],en:["I know quite a lot of common IT situations, but not everything 😊 If I can't identify something confidently, I'll say so.","I try to be useful with IT 😄 But I won't pretend to know everything; if my knowledge base doesn't cover it, I'll ask for details or suggest a specialist."],fi:["Tunnen melko paljon tavallisia IT-tilanteita, mutta en kaikkea 😊 Jos en tunnista ongelmaa varmasti, sanon sen.","Yritän olla hyödyllinen IT-asioissa 😄 En kuitenkaan teeskentele tietäväni kaikkea; tarvittaessa kysyn lisätietoja tai suosittelen asiantuntijaa."]}},
{p:["lol","haha","hahaha","hehe","funny","ахаха","хаха","ха ха","смешно","лол","хех","hauska"],a:{ru:["😄 Хорошо, хоть IT-поддержка сегодня не слишком серьёзная.","😄 Засчитано. Продолжаем спасать компьютер или просто болтаем?","Хаха 😄 Я стараюсь поддерживать не только компьютеры, но и настроение."],en:["😄 Good — IT support doesn't have to be serious all the time.","😄 I'll take that. Are we going back to saving the computer, or just chatting?","Haha 😄 I try to support the mood as well as the computer."],fi:["😄 Hyvä — IT-tuen ei tarvitse aina olla vakavaa.","😄 Selvä. Jatketaanko tietokoneen pelastamista vai jutellaanko vain?","Haha 😄 Yritän tukea tietokoneen lisäksi myös tunnelmaa."]}},
{p:["good job","well done","you are good","youre good","you're good","great anita","молодец","хорошая работа","ты молодец","ты крутая","круто анита","hyvin tehty","olet hyvä","hyvä anita"],a:{ru:["Спасибо 😊 Приятно слышать!","Спасибо! Запишем это как успешно закрытый тикет 😄","Рада, что помогло 😊"],en:["Thank you 😊 Nice to hear that!","Thanks! Let's mark that as a successfully closed ticket 😄","Glad it helped 😊"],fi:["Kiitos 😊 Mukava kuulla!","Kiitos! Merkitään tämä onnistuneesti ratkaistuksi 😄","Mukava että siitä oli apua 😊"]}},
{p:["i am tired","im tired","i'm tired","bad day","i am sad","im sad","i am bored","im bored","мне скучно","я устал","я устала","плохой день","мне грустно","olen väsynyt","huono päivä","olen surullinen","tylsää"],a:{ru:["Понимаю. Можем не спешить 😊 Если есть техническая проблема, опиши её как получится — разберём по шагам.","Тогда без лишней сложности 😊 Напиши, что нужно сделать с компьютером, и попробуем пройти самый короткий путь."],en:["I understand. No need to rush 😊 If there's a tech problem, describe it however you can and we'll go step by step.","Let's keep things simple then 😊 Tell me what you need the computer to do, and we'll try the shortest route."],fi:["Ymmärrän. Ei tarvitse kiirehtiä 😊 Jos on tekninen ongelma, kuvaile se miten pystyt, niin käydään se vaiheittain.","Pidetään asiat yksinkertaisina 😊 Kerro mitä tietokoneen pitäisi tehdä, niin etsitään lyhin ratkaisu."]}},
{p:["pc is computer","pc means computer","computer is pc","what does pc mean","what is pc","пк это компьютер","что такое пк","pc это компьютер","pc on tietokone","mikä on pc"],a:{ru:["Да 😊 PC означает Personal Computer — персональный компьютер. Можешь писать PC, ПК или «компьютер» — я пойму.","Верно. PC = Personal Computer. В разговоре можешь использовать любой из этих вариантов."],en:["Exactly 😊 PC means Personal Computer. You can write either “PC” or “computer” — I understand both.","Correct. PC = Personal Computer. Feel free to use either term."],fi:["Aivan 😊 PC tarkoittaa Personal Computer eli henkilökohtaista tietokonetta. Voit kirjoittaa PC tai tietokone — ymmärrän molemmat.","Kyllä. PC = Personal Computer. Voit käyttää kumpaa tahansa sanaa."]}}
];
function chatClean(s){return normalize(s).replace(/[!?.,;:'"()]/g," ").replace(/\s+/g," ").trim()}
function findSmallTalk(raw,l){let q=chatClean(raw),best=null,bs=0;if(!q)return null;for(const x of SMALLTALK)for(const p of x.p){let z=chatClean(p),s=q===z?100:(z.length>=4&&q.includes(z)?70+Math.min(z.length,20):0);if(s>bs){bs=s;best=x}}return bs>=70?best:null}
function smallTalkAnswer(x,l){let a=x.a[l]||x.a.en;return a[Math.floor(Math.random()*a.length)]}

const HUMAN_REQUESTS={
ru:["реальный человек","живой человек","настоящий человек","хочу поговорить с человеком","хочу поговорить с реальным человеком","хочу поговорить с живым человеком","хочу поговорить с настоящим человеком","хочу связаться с человеком","хочу связаться с реальным человеком","хочу связаться с живым человеком","связаться с реальным человеком","связаться с живым человеком","поговорить с реальным человеком","поговорить с живым человеком","поговорить со специалистом","связаться со специалистом","нужен специалист","нужен мастер","нужен техник","дай контакты специалиста","дайте контакты специалиста","контакты специалиста","контакты мастера","контакты it специалиста","компьютерный мастер","позвать специалиста","соединить со специалистом","переключить на человека","оператор","живой оператор","реальный оператор","куда обратиться","где отремонтировать компьютер","к кому обратиться","нужна помощь человека"],
en:["real person","real human","human support","talk to a person","speak to a person","talk to a human","speak to a human","talk to a real person","speak to a real person","contact a real person","contact a human","connect me to a person","connect me to a human","connect me to a specialist","human agent","real agent","live agent","operator","contact a technician","talk to technician","talk to specialist","i need a technician","i need a specialist","computer technician","where can i get help","where can i repair my computer"],
fi:["oikea ihminen","oikealle ihmiselle","haluan puhua ihmiselle","haluan puhua oikealle ihmiselle","haluan puhua oikean ihmisen kanssa","yhdistä ihmiselle","yhdistä oikealle ihmiselle","haluan asiantuntijan","tarvitsen asiantuntijan","tarvitsen teknikon","ota yhteyttä teknikkoon","ota yhteyttä asiantuntijaan","haluan puhua asiantuntijalle","operaattori","oikea asiakaspalvelija","tietokonehuolto","tietokonekorjaaja","mihin voin ottaa yhteyttä","missä voin korjata tietokoneen"]
};

const FINLAND_IT_SUPPORT=[
{name:"Mikrotukikohta",area:"Espoo / pääkaupunkiseutu",phone:"045 133 2777",phoneLink:"+358451332777",email:"mikrotuki@mikrotukikohta.fi",website:"https://www.mikrotukikohta.fi/",d:{ru:"Компьютерная поддержка, диагностика, установка и ремонт.",en:"Computer support, diagnostics, installation and repair.",fi:"Tietokonetuki, diagnostiikka, asennukset ja huolto."}},
{name:"Leppävaaran Tietokonehuolto",area:"Espoo",phone:"044 237 1648",phoneLink:"+358442371648",email:"asiakaspalvelu@tietokonelepuski.fi",website:"https://tietokonelepuski.fi/",d:{ru:"Компьютерный сервис и IT-поддержка.",en:"Computer service and IT support.",fi:"Tietokonehuolto ja IT-tuki."}},
{name:"DigiCity",area:"Helsinki / Espoo / Vantaa",phone:"+358 45 341 8323",phoneLink:"+358453418323",email:"info@digicity.fi",website:"https://digicity.fi/",d:{ru:"Ремонт ноутбуков и компьютерной техники, включая мобильный сервис.",en:"Laptop and computer-device repair, including mobile service.",fi:"Kannettavien ja tietokonelaitteiden huolto sekä liikkuva palvelu."}}
];

const CONTACT_QUERIES={ru:["контакты alex node","как связаться с alex node","телефон alex node","почта alex node","whatsapp alex node","сайт alex node","нужна it поддержка"],en:["alex node contacts","contact alex node","alex node phone","alex node email","alex node whatsapp","i need it support"],fi:["alex node yhteystiedot","ota yhteyttä alex nodeen","alex noden puhelin","alex noden sähköposti","tarvitsen it-tukea"]};
const rejectWords={ru:["нет не это","не это имел в виду","не то","ты неправильно поняла","другая проблема"],en:["no not that","that's not what i meant","you misunderstood","different problem"],fi:["ei sitä","en tarkoittanut sitä","ymmärsit väärin","eri ongelma"]};
const failWords={ru:["не помогло","не помогает","не сработало","проблема осталась"],en:["did not help","didn't help","did not work","still not working","problem remains"],fi:["ei auttanut","ei auta","ei toiminut","ongelma jatkuu"]};

function normalize(t){return t.toLowerCase().replace(/ё/g,"е").replace(/[.,!?;:()[\]{}"'`]/g," ").replace(/\s+/g," ").trim()}
function tokenize(t){return normalize(t).split(" ").filter(w=>w.length>2)}
function detectLanguage(t){if((t.match(/[а-яё]/gi)||[]).length>2)return"ru";let s=normalize(t),fi=["miksi","miten","tietokone","näyttö","toimi","minulla","ongelma","verkko","sähköposti","tulostin","kannettava","yhteys","haluan","tarvitsen","ei","prosessori","suoritin","emolevy","virtalähde","näytönohjain"],en=["why","how","computer","monitor","working","problem","network","email","printer","laptop","connection","want","need","not","processor","motherboard","power supply","graphics card"],a=0,b=0;fi.forEach(w=>{if(s.includes(w))a++});en.forEach(w=>{if(s.includes(w))b++});a+=(t.match(/[äö]/gi)||[]).length*2;return a>b?"fi":"en"}
function scoreItem(i,q,l){let t=normalize(q),u=tokenize(q),s=0;i.p[l].forEach(p=>{let n=normalize(p);if(t===n)s+=15;else if(t.includes(n)&&n.length>8)s+=8;else{let x=tokenize(n),m=x.filter(z=>u.some(v=>v.includes(z)||z.includes(v))).length;if(x.length&&m/x.length>=.6)s+=4*m/x.length}});i.k[l].forEach(k=>{k=normalize(k);if(t.includes(k))s+=k.length>6?3.2:2});return s}
let excludedCategories=new Set();
function findBest(q,l){let b=null,bs=0,ss=0;knowledge.forEach(i=>{if(excludedCategories.has(i.id))return;let s=scoreItem(i,q,l);if(s>bs){ss=bs;bs=s;b=i}else if(s>ss)ss=s});return{item:b,score:bs,difference:bs-ss}}

const chat=document.querySelector("#chat"),input=document.querySelector("#input"),form=document.querySelector("#form"),send=document.querySelector("#send"),footer=document.querySelector("#footer"),online=document.querySelector("#online"),suggestions=document.querySelector("#suggestions");
let languageMode="auto",currentLanguage="ru",previousCategory=null,previousQuestion="",failedAttempts=0;

function addMessage(t,type){let d=document.createElement("div");d.className="msg "+type;d.textContent=t;chat.appendChild(d);chat.scrollTop=chat.scrollHeight}
function containsPhrase(t,a){let n=normalize(t);return a.some(p=>n.includes(normalize(p)))}
function isHuman(t,l){let n=normalize(t),langs=languageMode==="auto"?["ru","en","fi"]:[l];return langs.some(x=>HUMAN_REQUESTS[x].some(p=>n.includes(normalize(p))))}
function isContact(t,l){let n=normalize(t),langs=languageMode==="auto"?["ru","en","fi"]:[l];return langs.some(x=>CONTACT_QUERIES[x].some(p=>n.includes(normalize(p))))}
function findTech(t,l){let n=normalize(t),langs=languageMode==="auto"?["ru","en","fi"]:[l],best=null,len=0;Object.values(TECH_TERMS).forEach(i=>langs.forEach(x=>i.aliases[x].forEach(a=>{a=normalize(a);if(n.includes(a)&&a.length>len){best=i;len=a.length}})));return best}

function alexCard(l){let u=UI[l],c=document.createElement("div");c.className="contactCard";c.innerHTML=`<h3>${u.contactTitle}</h3><p>${u.contactText}</p><p><strong>${CONFIG.phoneDisplay}</strong><br>${CONFIG.email}</p><div class="contactButtons"><a class="contactButton orange" href="${CONFIG.whatsapp}" target="_blank" rel="noopener">WhatsApp</a><a class="contactButton" href="tel:${CONFIG.phone}">${u.call}</a><a class="contactButton" href="mailto:${CONFIG.email}">${u.mail}</a><a class="contactButton" href="${CONFIG.website}" target="_blank" rel="noopener">${u.site}</a></div>`;chat.appendChild(c)}
function showHuman(l){alexCard(l);let u=UI[l],m=document.createElement("div");m.className="msg bot";m.textContent=l==="ru"?"Также можно обратиться в один из этих независимых IT-сервисов в Финляндии:":l==="fi"?"Voit myös ottaa yhteyttä johonkin näistä riippumattomista IT-palveluista Suomessa:":"You can also contact one of these independent IT services in Finland:";chat.appendChild(m);FINLAND_IT_SUPPORT.forEach(x=>{let c=document.createElement("div");c.className="contactCard";c.innerHTML=`<h3>${x.name}</h3><p>${x.d[l]}</p><p><strong>${x.area}</strong><br>${x.phone}<br>${x.email}</p><div class="contactButtons"><a class="contactButton" href="tel:${x.phoneLink}">${u.call}</a><a class="contactButton" href="mailto:${x.email}">${u.mail}</a><a class="contactButton orange" href="${x.website}" target="_blank" rel="noopener">${u.site}</a></div>`;chat.appendChild(c)});chat.scrollTop=chat.scrollHeight}
function showEscalation(l){addMessage(UI[l].escalate,"bot");showHuman(l)}


const SMART_INTENTS=[{"n":"greet","t":"chat","p":["hi","hello","hey","hiya","yo","sup","wassup","what's up anita","whats up anita","hey anita","hi anita","hello anita","привет","привет анита","здарова","здорово","хай","йо","hei","moi","moikka","terve","hei anita","moi anita"],"a":{"ru":["Привет 👋 Я ANITA. Чем могу помочь?","Привет 😊 Я здесь. Рассказывай.","Хай 😄 Что случилось с техникой — или просто поболтаем?"],"en":["Hi 👋 I'm ANITA. How can I help?","Hey 😊 I'm here. Tell me what's up.","Hi 😄 Tech problem, or just a little chat?"],"fi":["Hei 👋 Olen ANITA. Miten voin auttaa?","Moi 😊 Olen täällä. Kerro vain.","Hei 😄 Tekniikkaongelma vai jutellaanko hetki?"]}},{"n":"howare","t":"chat","p":["how are you","how r u","how are u","how you doing","how ya doing","you good","u good","how's it going","hows it going","how are you anita","как дела","как ты","ты как","как поживаешь","че как","что нового","mitä kuuluu","miten menee","kuinka voit","mitä kuuluu anita"],"a":{"ru":["У меня всё хорошо 😊 Системы в норме. А как у тебя?","Отлично 😄 Готова помогать. Как твои дела?","Хорошо 😊 Что у тебя сегодня происходит?"],"en":["I'm good 😊 All systems normal. How are you?","Doing great 😄 Ready to help. How about you?","I'm good 😊 What's going on with you today?"],"fi":["Hyvin menee 😊 Järjestelmät kunnossa. Mitä sinulle kuuluu?","Oikein hyvin 😄 Valmiina auttamaan. Entä sinulla?","Hyvin 😊 Mitä sinulle kuuluu tänään?"]}},{"n":"help","t":"chat","p":["can you help me","can u help me","can you help","help me","help pls","help please","i need help","need help","could you help","got a problem","i have a problem","поможешь","можешь помочь","помоги","помоги мне","мне нужна помощь","у меня проблема","voitko auttaa","auta minua","tarvitsen apua","minulla on ongelma"],"a":{"ru":["Конечно 😊 Опиши проблему своими словами — технические термины не нужны.","Да. Расскажи, что именно не работает и что ты видишь на экране.","Для этого я здесь 👍 Напиши проблему так, как объяснил бы её человеку."],"en":["Of course 😊 Describe it in your own words — no technical terms needed.","Yes. Tell me what isn't working and what you see on screen.","That's what I'm here for 👍 Explain it the way you'd explain it to a person."],"fi":["Totta kai 😊 Kuvaile ongelma omin sanoin — teknisiä termejä ei tarvita.","Kyllä. Kerro mikä ei toimi ja mitä näytöllä näkyy.","Sitä varten olen täällä 👍 Kerro ongelma kuten kertoisit ihmiselle."]}},{"n":"thanks","t":"chat","p":["thanks","thank you","thx","ty","cheers anita","thanks anita","спасибо","спс","благодарю","спасибо анита","kiitos","kiitti","kiitos anita"],"a":{"ru":["Пожалуйста 😊","Всегда пожалуйста!","Рада помочь 😊"],"en":["You're welcome 😊","Anytime!","Happy to help 😊"],"fi":["Ole hyvä 😊","Ei mitään!","Mukava auttaa 😊"]}},{"n":"bye","t":"chat","p":["bye","goodbye","see you","see ya","later","cya","catch you later","пока","до свидания","до встречи","увидимся","näkemiin","heippa","nähdään","moikka moi"],"a":{"ru":["Пока 👋 Возвращайся, если техника снова начнёт капризничать.","До встречи 😊","Пока! Хорошего дня."],"en":["Bye 👋 Come back if your tech starts misbehaving again.","See you 😊","Bye! Have a good day."],"fi":["Heippa 👋 Tule takaisin jos tekniikka temppuilee.","Nähdään 😊","Moikka! Hyvää päivänjatkoa."]}},{"n":"name","t":"chat","p":["what is your name","what's your name","whats your name","your name","who should i call you","как тебя зовут","твое имя","твоё имя","как тебя называть","mikä nimesi on","mikä sinun nimesi on"],"a":{"ru":["Меня зовут ANITA 😊 Это сокращение от Alex Node IT Assistance."],"en":["My name is ANITA 😊 It stands for Alex Node IT Assistance."],"fi":["Nimeni on ANITA 😊 Se tulee sanoista Alex Node IT Assistance."]}},{"n":"identity","t":"chat","p":["who are you","what are you","are you ai","are you an ai","are you a bot","are you human","are you real","r u ai","r u human","кто ты","ты ии","ты бот","ты человек","ты настоящая","kuka olet","oletko tekoäly","oletko botti","oletko ihminen"],"a":{"ru":["Я ANITA — Alex Node IT Assistance. Я не генеративный AI: мои ответы и диагностические сценарии заранее подготовлены, а система распознаёт формулировки пользователя."],"en":["I'm ANITA — Alex Node IT Assistance. I'm not generative AI: my replies and troubleshooting flows are prepared in advance, while my code matches what the user means."],"fi":["Olen ANITA — Alex Node IT Assistance. En ole generatiivinen tekoäly: vastaukseni ja vianmäärityspolkuni on valmisteltu etukäteen, ja koodi tunnistaa käyttäjän tarkoituksen."]}},{"n":"abilities","t":"chat","p":["what can you do","what do you do","what can you help with","your functions","your capabilities","what do you know","что ты умеешь","чем можешь помочь","твои возможности","mitä osaat","mitä voit tehdä","missä voit auttaa"],"a":{"ru":["Я помогаю обычным пользователям с Windows, программами, интернетом/Wi‑Fi, мониторами, принтерами, звуком, Bluetooth, драйверами, USB, дисками, паролями входа, файлами и базовой диагностикой компьютера."],"en":["I help home users with Windows, apps, internet/Wi‑Fi, monitors, printers, sound, Bluetooth, drivers, USB, storage, sign-in problems, files and basic PC troubleshooting."],"fi":["Autan kotikäyttäjiä Windowsin, ohjelmien, internetin/Wi‑Fin, näyttöjen, tulostimien, äänen, Bluetoothin, ajureiden, USB:n, tallennustilan, kirjautumisen, tiedostojen ja PC:n perusvianmäärityksen kanssa."]}},{"n":"yes","t":"chat","p":["yes","yeah","yep","yup","yea","correct","right","exactly","sure","да","ага","точно","верно","именно","kyllä","joo","juu","aivan","oikein"],"a":{"ru":["Поняла 👍","Хорошо, идём дальше.","Отлично — это помогает сузить причину."],"en":["Got it 👍","Okay, let's continue.","Great — that helps narrow it down."],"fi":["Selvä 👍","Hyvä, jatketaan.","Hienoa — se auttaa rajaamaan syytä."]}},{"n":"no","t":"chat","p":["no","nope","nah","not really","wrong","нет","неа","не совсем","неправильно","ei","en","ei oikeastaan"],"a":{"ru":["Хорошо. Тогда опиши это другими словами — можно совсем просто.","Поняла. Скажи, какая часть не совпала."],"en":["Okay. Describe it another way — simple everyday words are fine.","Got it. Tell me which part was wrong."],"fi":["Selvä. Kuvaile se toisilla sanoilla — tavallinen kieli käy.","Ymmärsin. Kerro mikä kohta meni väärin."]}},{"n":"ok","t":"chat","p":["ok","okay","okey","alright","got it","i see","understood","fine","k","kk","ок","окей","понял","поняла","ясно","хорошо","ладно","угу","selvä","okei","ymmärsin","hyvä"],"a":{"ru":["Хорошо 😊 Продолжаем.","Поняла 👍"],"en":["Okay 😊 Let's continue.","Got it 👍"],"fi":["Selvä 😊 Jatketaan.","Ymmärsin 👍"]}},{"n":"idk","t":"chat","p":["i don't know","i dont know","i do not know","idk","dunno","not sure","no idea","not a clue","я не знаю","не знаю","без понятия","не уверен","не уверена","en tiedä","en ole varma","ei aavistustakaan"],"a":{"ru":["Ничего страшного 😊 Просто расскажи, что видишь на экране и что ожидал увидеть.","Это нормально. Начнём с простого: что происходит, когда ты пытаешься сделать нужное действие?"],"en":["No problem 😊 Just tell me what you see on screen and what you expected to happen.","That's fine. Let's start simple: what happens when you try to do it?"],"fi":["Ei haittaa 😊 Kerro vain mitä näytöllä näkyy ja mitä odotit tapahtuvan.","Se on ihan ok. Aloitetaan yksinkertaisesti: mitä tapahtuu kun yrität tehdä sen?"]}},{"n":"wait","t":"chat","p":["wait","hold on","one sec","one second","brb","gimme a sec","секунду","подожди","минутку","сейчас","odota","hetki","yksi sekunti"],"a":{"ru":["Конечно, я здесь 😊","Без проблем. Продолжай, когда будешь готов."],"en":["Sure, I'm here 😊","No problem. Continue when you're ready."],"fi":["Toki, olen täällä 😊","Ei kiirettä. Jatka kun olet valmis."]}},{"n":"sorry","t":"chat","p":["sorry","my bad","oops","sry","сорри","извини","простите","упс","anteeksi","hups"],"a":{"ru":["Всё нормально 😊","Ничего страшного. Продолжаем."],"en":["No worries 😊","It's fine. Let's continue."],"fi":["Ei haittaa 😊","Kaikki hyvin. Jatketaan."]}},{"n":"repeat","t":"chat","p":["what do you mean","i don't understand","i dont understand","explain that","say that again","repeat please","huh","что ты имеешь в виду","я не понял","я не поняла","объясни","повтори","mitä tarkoitat","en ymmärrä","selitä","toista"],"a":{"ru":["Конечно. Напиши, какую именно часть объяснить проще, и я переформулирую.","Скажи, какое слово или шаг непонятен."],"en":["Sure. Tell me which part you'd like in simpler words and I'll rephrase it.","Tell me which word or step is unclear."],"fi":["Toki. Kerro mikä kohta pitäisi selittää helpommin, niin muotoilen sen uudelleen.","Kerro mikä sana tai vaihe on epäselvä."]}},{"n":"there","t":"chat","p":["are you there","you there","still there","anita you there","hello are you there","ты тут","ты здесь","анита ты тут","oletko siellä","oletko täällä"],"a":{"ru":["Да, я здесь 👋","Я на месте 😊 Что дальше?"],"en":["Yep, I'm here 👋","Still here 😊 What's next?"],"fi":["Kyllä, olen täällä 👋","Olen paikalla 😊 Mitä seuraavaksi?"]}},{"n":"lol","t":"chat","p":["lol","lmao","rofl","haha","hahaha","hehe","xd","funny","ахаха","хаха","лол","смешно","хех","haha","hehe","hauska"],"a":{"ru":["😄 Хорошо, хоть IT‑поддержка сегодня не слишком серьёзная.","Хаха 😄 Продолжаем спасать компьютер или просто болтаем?"],"en":["😄 Good — IT support doesn't have to be serious all the time.","Haha 😄 Are we saving the computer or just chatting?"],"fi":["😄 Hyvä — IT-tuen ei tarvitse aina olla vakavaa.","Haha 😄 Pelastetaanko tietokone vai jutellaanko vain?"]}},{"n":"compliment","t":"chat","p":["good job","well done","you are good","you're good","youre good","nice one","great anita","smart girl","молодец","ты молодец","ты крутая","хорошая работа","hyvin tehty","olet hyvä","hyvä anita"],"a":{"ru":["Спасибо 😊 Приятно слышать!","Спасибо! Запишем это как успешно закрытый тикет 😄"],"en":["Thank you 😊 Nice to hear that!","Thanks! Let's mark that as a successfully closed ticket 😄"],"fi":["Kiitos 😊 Mukava kuulla!","Kiitos! Merkitään tämä onnistuneesti ratkaistuksi 😄"]}},{"n":"mood","t":"chat","p":["i am tired","im tired","i'm tired","i am bored","im bored","i'm bored","bad day","i am sad","im sad","я устал","я устала","мне скучно","плохой день","мне грустно","olen väsynyt","tylsää","huono päivä","olen surullinen"],"a":{"ru":["Понимаю. Давай без лишней сложности 😊 Если есть проблема с компьютером, опиши её как получится.","Тогда пойдём самым коротким путём. Что именно нужно заставить работать?"],"en":["I understand. Let's keep it simple 😊 If there's a PC problem, describe it however you can.","Then let's take the shortest route. What exactly do you need to get working?"],"fi":["Ymmärrän. Pidetään tämä yksinkertaisena 😊 Kuvaile PC-ongelma miten pystyt.","Mennään lyhintä reittiä. Mikä pitäisi saada toimimaan?"]}},{"n":"pcmeaning","t":"chat","p":["pc is computer","pc means computer","computer is pc","what is pc","what does pc mean","pc = computer","пк это компьютер","что такое пк","pc это компьютер","pc on tietokone","mikä on pc"],"a":{"ru":["Да 😊 PC означает Personal Computer — персональный компьютер. Можешь писать PC, ПК, «комп» или «компьютер» — я распознаю эти варианты."],"en":["Exactly 😊 PC means Personal Computer. You can say PC, computer, desktop, machine or even comp — I'll understand those common variants."],"fi":["Aivan 😊 PC tarkoittaa henkilökohtaista tietokonetta. Voit käyttää sanoja PC, tietokone tai kone — ymmärrän tavalliset muodot."]}},{"n":"dead","t":"problem","p":["my pc stopped working","my pc stoiped working","my pc stoped working","computer stopped working","computer suddenly stopped","pc not working","my computer broke","my pc died","computer is dead","компьютер перестал работать","пк перестал работать","компьютер сломался","комп умер","tietokone lakkasi toimimasta","pc ei toimi","tietokone hajosi"],"a":{"ru":"Поняла. Нужно определить, на каком этапе компьютер перестал работать. Есть ли при нажатии Power свет/вентиляторы? Если да — появляется ли логотип Windows или производителя? Если компьютер включён, но экран чёрный — скажи это отдельно. Напиши, что именно происходит после нажатия Power.","en":"Got it. First we need to find where it stops. When you press Power, do you get lights/fans? If yes, do you see the Windows or manufacturer logo? If the PC seems on but the screen is black, tell me that. Describe exactly what happens after you press Power.","fi":"Selvä. Selvitetään ensin missä vaiheessa toiminta pysähtyy. Tuleeko virtapainikkeesta valoja tai tuulettimen ääntä? Jos tulee, näkyykö Windowsin tai valmistajan logo? Jos kone käy mutta näyttö on musta, kerro se erikseen."}},{"n":"slow","t":"problem","p":["my pc works slow","my pc is slow","pc works slow","pc running slow","computer running slow","computer is laggy","my computer lags","my comp is slow","computer sluggish","pc freezing a lot","комп тормозит","компьютер медленный","пк лагает","комп тупит","tietokone on hidas","kone lagaa"],"kid":"slow"},{"n":"power","t":"problem","p":["pc wont turn on","pc won't turn on","computer wont start","computer won't start","no power on pc","laptop wont power on","пк не включается","компьютер не включается","ноутбук не включается","tietokone ei käynnisty","kannettava ei käynnisty"],"kid":"power"},{"n":"boot","t":"problem","p":["windows wont start","windows won't start","stuck on windows logo","pc turns on but windows not loading","boot loop","windows не загружается","завис на логотипе windows","tietokone käynnistyy mutta windows ei lataudu"],"kid":"boot"},{"n":"monitor","t":"problem","p":["black screen","monitor no signal","screen says no signal","pc on but no picture","monitor not showing","no image on screen","черный экран","монитор no signal","нет изображения","näyttö musta","ei kuvaa näytöllä"],"kid":"monitor"},{"n":"internet","t":"problem","p":["no internet","internet not working","net is down","my internet died","internet gone","connected but no internet","нет интернета","интернет пропал","инет не работает","internet ei toimi","netti ei toimi"],"kid":"internet"},{"n":"wifi","t":"problem","p":["wifi not connecting","cant connect to wifi","can't connect to wifi","wifi keeps disconnecting","wifi not working on pc","не подключается wifi","вайфай не подключается","wifi ei yhdistä"],"kid":"wifi"},{"n":"weakwifi","t":"problem","p":["wifi slow","wifi weak","weak wifi signal","wifi is laggy","slow wireless","слабый wifi","медленный wifi","плохо ловит wifi","wifi on hidas"],"kid":"weakwifi"},{"n":"printer","t":"problem","p":["printer not printing","printer offline","pc cant see printer","printer won't print","принтер не печатает","принтер offline","tulostin ei tulosta"],"kid":"printer"},{"n":"sound","t":"problem","p":["no sound","sound not working","pc has no audio","speakers not working","нет звука","звук пропал","ääni ei toimi"],"kid":"sound"},{"n":"headphones","t":"problem","p":["headphones not working","earbuds not working","no sound in headphones","pc not detecting headphones","наушники не работают","нет звука в наушниках","kuulokkeet ei toimi"],"a":{"ru":"Если наушники не работают: переподключи их, нажми значок громкости и выбери правильное устройство вывода, проверь Mute и громкость. Для Bluetooth удали устройство и подключи заново. Если можешь, проверь наушники на другом устройстве.","en":"If headphones aren't working: reconnect them, click the volume icon and choose the correct output device, then check Mute and volume. For Bluetooth, remove the device and pair it again. If possible, test the headphones on another device.","fi":"Jos kuulokkeet eivät toimi: kytke ne uudelleen, valitse äänenvoimakkuuskuvakkeesta oikea toistolaite ja tarkista mykistys/äänenvoimakkuus. Bluetoothissa poista laite ja parita uudelleen."}},{"n":"bluetooth","t":"problem","p":["bluetooth not working","cant connect bluetooth","can't connect bluetooth","bluetooth device not found","bluetooth не работает","не подключается bluetooth","bluetooth ei toimi"],"kid":"bluetooth"},{"n":"microphone","t":"problem","p":["microphone not working","mic not working","people cant hear me","people can't hear me","no mic input","микрофон не работает","меня не слышно","mikrofoni ei toimi"],"kid":"microphone"},{"n":"webcam","t":"problem","p":["camera not working","webcam not working","camera black screen","zoom cant see camera","камера не работает","вебкамера не работает","webcam ei toimi"],"kid":"webcam"},{"n":"usb","t":"problem","p":["usb not working","usb device not recognized","pc doesnt see usb","usb port not working","usb не работает","устройство usb не опознано","usb ei toimi"],"kid":"usb"},{"n":"external","t":"problem","p":["external drive not showing","external hdd not detected","external ssd not detected","usb drive not showing","внешний диск не виден","флешка не определяется","ulkoinen levy ei näy"],"kid":"externalDrive"},{"n":"storage","t":"problem","p":["disk full","c drive full","no space left","storage full","not enough disk space","диск c заполнен","нет места на диске","levy täynnä"],"kid":"storage"},{"n":"virus","t":"problem","p":["i think i have virus","computer has malware","weird popups everywhere","pc infected","вирус на компьютере","компьютер заражен","haittaohjelma"],"kid":"virus"},{"n":"drivers","t":"problem","p":["driver problem","missing driver","device manager warning","yellow exclamation device manager","драйвер не установлен","ошибка драйвера","ajuriongelma"],"kid":"drivers"},{"n":"bsod","t":"problem","p":["blue screen","bsod","computer blue screen","windows blue screen","синий экран","синий экран смерти","sininen näyttö"],"kid":"bsod"},{"n":"heat","t":"problem","p":["pc overheating","computer too hot","laptop very hot","fan loud and hot","компьютер греется","ноутбук горячий","tietokone kuumenee"],"kid":"heat"},{"n":"update","t":"problem","p":["windows update stuck","windows update failed","update wont install","windows update error","обновление windows зависло","windows update ошибка","windows update jumissa"],"kid":"update"},{"n":"browser","t":"problem","p":["websites not opening","browser not loading pages","chrome not working","edge not working","сайты не открываются","браузер не работает","sivut eivät aukea"],"kid":"browser"},{"n":"email","t":"problem","p":["outlook not working","email not sending","email not receiving","mail not syncing","почта не отправляется","outlook не работает","sähköposti ei toimi"],"kid":"email"},{"n":"battery","t":"problem","p":["laptop battery drains fast","battery not charging","laptop not charging","battery dies quickly","ноутбук не заряжается","батарея быстро садится","akku ei lataudu"],"kid":"battery"},{"n":"touchpad","t":"problem","p":["touchpad not working","trackpad not working","mousepad not working","laptop pad stopped","тачпад не работает","сенсорная панель не работает","kosketuslevy ei toimi"],"a":{"ru":"Если тачпад не работает: проверь Fn-клавишу с символом тачпада, затем Settings → Bluetooth & devices → Touchpad. Перезагрузи ноутбук. Если не помогло — обнови драйвер тачпада с сайта производителя. Временно можно использовать USB-мышь.","en":"If the touchpad isn't working: check the Fn key with a touchpad icon, then Settings → Bluetooth & devices → Touchpad. Restart the laptop. If needed, update the touchpad driver from the laptop maker's website. A USB mouse can be used temporarily.","fi":"Jos kosketuslevy ei toimi: tarkista Fn-näppäin jossa on kosketuslevyn kuvake, sitten Asetukset → Bluetooth ja laitteet → Kosketuslevy. Käynnistä kannettava uudelleen ja päivitä tarvittaessa ajuri valmistajan sivulta."}},{"n":"appcrash","t":"problem","p":["app keeps crashing","program keeps crashing","app not responding","program not responding","application closes itself","программа вылетает","программа не отвечает","ohjelma kaatuu"],"a":{"ru":"Если программа зависает или вылетает: закрой её через Ctrl+Shift+Esc → Task Manager, перезапусти ПК, обнови программу и Windows. Если проблема только в одной программе — переустанови её после сохранения нужных данных. Если есть код ошибки, напиши его ANITA.","en":"If an app freezes or crashes: close it with Ctrl+Shift+Esc → Task Manager, restart the PC, update the app and Windows. If only that app is affected, reinstall it after saving important data/settings. If you see an error code, send it to ANITA.","fi":"Jos ohjelma jumittuu tai kaatuu: sulje se Ctrl+Shift+Esc → Tehtävienhallinta, käynnistä PC uudelleen ja päivitä ohjelma sekä Windows. Jos vain yksi ohjelma oireilee, asenna se uudelleen tärkeät tiedot ensin talteen ottaen."}},{"n":"startupslow","t":"problem","p":["windows starts slow","slow boot","pc takes forever to start","computer boots slowly","windows долго загружается","долго включается компьютер","hidas käynnistys"],"a":{"ru":"Если Windows долго запускается: Ctrl+Shift+Esc → Автозагрузка и отключи ненужные программы; проверь, чтобы на C: было хотя бы 15–20% свободного места; установи Windows Update и выполни проверку Windows Security. Если Windows стоит на старом HDD, SSD обычно сильно ускоряет запуск.","en":"If Windows starts slowly: Ctrl+Shift+Esc → Startup apps and disable unnecessary items; keep roughly 15–20% free space on C:; install Windows Update and run Windows Security. If Windows is on an old HDD, an SSD usually makes startup much faster.","fi":"Jos Windows käynnistyy hitaasti: Ctrl+Shift+Esc → Käynnistyssovellukset ja poista tarpeettomat; pidä C:-levyllä noin 15–20% vapaata; asenna Windows Update ja suorita Windows Security. Vanhan HDD:n vaihtaminen SSD:hen nopeuttaa yleensä paljon."}},{"n":"highcpu","t":"problem","p":["cpu 100","cpu at 100","processor 100","high cpu usage","processor usage high","процессор 100","высокая загрузка процессора","cpu 100 prosenttia"],"a":{"ru":"Если CPU постоянно 90–100%: Ctrl+Shift+Esc → Processes → отсортируй по CPU и посмотри, какая программа создаёт нагрузку. Закрывай только знакомые ненужные программы. Перезапусти ПК, обнови Windows/программу. Если неизвестный процесс постоянно грузит CPU — запусти Windows Security.","en":"If CPU stays around 90–100%: Ctrl+Shift+Esc → Processes → sort by CPU and see what's using it. Close only apps you recognize and don't need. Restart, update Windows/the app, and run Windows Security if an unknown process keeps using CPU.","fi":"Jos CPU pysyy 90–100%:ssa: Ctrl+Shift+Esc → Prosessit → järjestä CPU:n mukaan. Sulje vain tuntemasi tarpeettomat ohjelmat. Käynnistä uudelleen, päivitä Windows/ohjelma ja suorita Windows Security jos tuntematon prosessi kuormittaa jatkuvasti."}},{"n":"highram","t":"problem","p":["ram full","memory full","high ram usage","ram at 100","not enough ram","оперативная память 100","озу заполнена","ram täynnä"],"a":{"ru":"При высокой загрузке RAM: Ctrl+Shift+Esc → Processes → Memory; закрой ненужные тяжёлые программы и лишние вкладки браузера; перезагрузи ПК; проверь автозагрузку. Если при обычной работе память постоянно 80–100%, возможно, RAM действительно мало.","en":"For high RAM usage: Ctrl+Shift+Esc → Processes → Memory; close unnecessary heavy apps and extra browser tabs; restart the PC; check Startup apps. If normal use constantly reaches 80–100%, the computer may genuinely need more RAM.","fi":"Jos RAM-muistin käyttö on korkea: Ctrl+Shift+Esc → Prosessit → Muisti; sulje raskaat tarpeettomat ohjelmat ja ylimääräiset välilehdet; käynnistä uudelleen; tarkista käynnistyssovellukset. Jos tavallinen käyttö on jatkuvasti 80–100%, RAM-muistia voi olla liian vähän."}},{"n":"disk100","t":"problem","p":["disk 100","disk at 100","100 disk usage","drive usage 100","диск 100 процентов","levy 100"],"a":{"ru":"Если Disk постоянно 100%: в Task Manager отсортируй процессы по Disk, дай Windows Update/антивирусной проверке закончить работу, перезапусти ПК, проверь свободное место и состояние диска. Старые HDD часто упираются в 100%; SSD обычно заметно улучшает отзывчивость.","en":"If Disk stays at 100%: sort Task Manager by Disk, let Windows Update/antivirus scans finish, restart, then check free space and drive health. Old HDDs often hit 100%; an SSD usually improves responsiveness a lot.","fi":"Jos Levy pysyy 100%:ssa: järjestä Tehtävienhallinta Levyn mukaan, anna Windows Updaten/virustarkistuksen valmistua, käynnistä uudelleen ja tarkista vapaa tila sekä levyn kunto. Vanha HDD käy usein 100%:ssa; SSD auttaa yleensä paljon."}},{"n":"gamefps","t":"problem","p":["low fps","game lagging","game is laggy","fps drops","game stuttering","bad fps","низкий fps","игра лагает","peli lagaa"],"a":{"ru":"Если в игре низкий FPS: подключи ноутбук к питанию, закрой лишние программы, проверь температуры CPU/GPU, обнови драйвер видеокарты с официального сайта NVIDIA/AMD/Intel и снизь тяжёлые графические настройки. Если есть дискретная видеокарта, убедись, что игра использует её.","en":"For low FPS: plug a laptop into power, close unnecessary apps, check CPU/GPU temperatures, update the graphics driver from NVIDIA/AMD/Intel, and lower demanding graphics settings. If you have a dedicated GPU, make sure the game uses it.","fi":"Jos FPS on matala: kytke kannettava verkkovirtaan, sulje tarpeettomat ohjelmat, tarkista CPU/GPU-lämpötilat, päivitä näytönohjaimen ajuri NVIDIA/AMD/Intel-sivulta ja laske raskaita grafiikka-asetuksia."}},{"n":"pin","t":"problem","p":["forgot windows pin","forgot password windows","cant login windows","can't login windows","windows password not accepted","забыл pin windows","не могу войти в windows","unohdin windows pin"],"a":{"ru":"Если не получается войти в Windows: проверь раскладку и Caps Lock, выбери Sign-in options, а для Microsoft Account используй официальное восстановление Microsoft. Для PIN можно выбрать “I forgot my PIN”, если доступно. Не отправляй ANITA пароль, PIN или коды подтверждения.","en":"If you can't sign in to Windows: check keyboard layout and Caps Lock, use Sign-in options, and for a Microsoft Account use Microsoft's official recovery. For a PIN, choose “I forgot my PIN” if available. Never send ANITA passwords, PINs or verification codes.","fi":"Jos Windowsiin kirjautuminen ei onnistu: tarkista näppäimistöasettelu ja Caps Lock, käytä Kirjautumisasetuksia ja Microsoft-tilille virallista palautusta. PIN-koodille valitse “Unohdin PIN-koodini”. Älä lähetä ANITAlle salasanoja tai koodeja."}},{"n":"deleted","t":"problem","p":["deleted file by accident","accidentally deleted file","recover deleted file","lost my file","file disappeared","удалил файл случайно","файл пропал","poistin tiedoston vahingossa"],"a":{"ru":"Если файл случайно удалён: сначала проверь Корзину. Если файл был в OneDrive — проверь корзину OneDrive и историю версий. Если файл очень важен, не записывай много новых данных на тот же диск, чтобы не перезаписать удалённые данные.","en":"If a file was deleted by accident: check the Recycle Bin first. If it was in OneDrive, check OneDrive's recycle bin and version history. If the file is very important, avoid writing lots of new data to the same drive so deleted data isn't overwritten.","fi":"Jos tiedosto poistettiin vahingossa: tarkista ensin Roskakori. Jos se oli OneDrivessa, tarkista OneDriven roskakori ja versiohistoria. Jos tiedosto on tärkeä, vältä uuden datan kirjoittamista samalle levylle."}},{"n":"onedrive","t":"problem","p":["onedrive not syncing","onedrive wont sync","onedrive won't sync","onedrive red x","files not uploading onedrive","onedrive не синхронизирует","onedrive ei synkronoi"],"a":{"ru":"Если OneDrive не синхронизируется: нажми значок OneDrive возле часов и прочитай статус, проверь интернет и свободное место, Pause syncing → Resume, затем перезапусти OneDrive/ПК и убедись, что вошёл в правильный Microsoft Account.","en":"If OneDrive isn't syncing: click the OneDrive icon near the clock and read its status, check internet and free space, Pause syncing → Resume, then restart OneDrive/the PC and make sure you're signed into the correct Microsoft Account.","fi":"Jos OneDrive ei synkronoi: napsauta OneDrive-kuvaketta kellon vieressä ja tarkista tila, internet ja vapaa tila, keskeytä/jatka synkronointia, käynnistä OneDrive/PC uudelleen ja tarkista että käytössä on oikea Microsoft-tili."}},{"n":"kbdlayout","t":"problem","p":["keyboard typing wrong letters","keyboard types wrong characters","wrong keyboard layout","keyboard language changed","клавиатура печатает не те буквы","неправильная раскладка","näppäimistö kirjoittaa väärin"],"a":{"ru":"Если клавиатура печатает не те символы: нажми Win+Space и выбери нужную раскладку. Затем Settings → Time & language → Language & region → Keyboard и удали ненужные раскладки. Если неправильно работает только одна физическая клавиша — проверь клавиатуру на другом ПК.","en":"If the keyboard types the wrong characters: press Win+Space and choose the correct layout. Then Settings → Time & language → Language & region → Keyboard and remove layouts you don't use. If only one physical key is wrong, test the keyboard on another PC.","fi":"Jos näppäimistö kirjoittaa vääriä merkkejä: paina Win+Space ja valitse oikea asettelu. Sitten Asetukset → Aika ja kieli → Kieli ja alue → Näppäimistö. Jos vain yksi fyysinen näppäin toimii väärin, testaa näppäimistö toisella PC:llä."}},{"n":"screenshot","t":"problem","p":["how to screenshot","how take screenshot","take a screenshot","print screen not working","как сделать скриншот","miten otan kuvakaappauksen"],"a":{"ru":"В Windows самый удобный вариант — Win+Shift+S: откроется Snipping Tool для выбора области. Win+PrtSc обычно сохраняет весь экран в Pictures\\Screenshots. На некоторых ноутбуках PrtSc требует Fn.","en":"In Windows, Win+Shift+S opens Snipping Tool to select an area. Win+PrtSc usually saves the full screen to Pictures\\Screenshots. On some laptops, PrtSc also requires Fn.","fi":"Windowsissa Win+Shift+S avaa Leikkaustyökalun alueen valintaan. Win+PrtSc tallentaa koko näytön yleensä Pictures\\Screenshots-kansioon. Joissakin kannettavissa PrtSc vaatii Fn-näppäimen."}},{"n":"copypaste","t":"problem","p":["copy paste not working","ctrl c ctrl v not working","clipboard not working","копировать вставить не работает","ctrl c ctrl v не работает","kopioi liitä ei toimi"],"a":{"ru":"Если Copy/Paste не работает: проверь в другой программе, попробуй правой кнопкой Copy/Paste вместо Ctrl+C/V, перезапусти проблемную программу или Windows Explorer через Task Manager, затем при необходимости перезагрузи ПК.","en":"If Copy/Paste isn't working: test another app, try right-click Copy/Paste instead of Ctrl+C/V, restart the affected app or Windows Explorer through Task Manager, then restart the PC if needed.","fi":"Jos Kopioi/Liitä ei toimi: kokeile toisessa ohjelmassa, käytä hiiren oikean painikkeen Kopioi/Liitä-toimintoja, käynnistä ohjelma tai Windows Explorer uudelleen Tehtävienhallinnasta ja tarvittaessa PC uudelleen."}}];
const SMART_ALIASES={en:[["pc","computer"],["desktop","computer"],["rig","computer"],["machine","computer"],["comp","computer"],["lappy","laptop"],["notebook","laptop"],["net","internet"],["laggy","slow"],["sluggish","slow"],["lags","slow"],["lagging","slow"],["frozen","freezing"],["hangs","freezing"],["hanging","freezing"],["stopped working","not working"],["stop working","not working"],["doesnt work","not working"],["doesn't work","not working"],["wont work","not working"],["won't work","not working"],["died","not working"],["dead","not working"],["broke","not working"],["broken","not working"],["cant","cannot"],["can't","cannot"],["doesnt","does not"],["doesn't","does not"],["isnt","is not"],["isn't","is not"],["ive","i have"],["i've","i have"],["im","i am"],["i'm","i am"],["pls","please"],["plz","please"],["idk","i do not know"],["dunno","i do not know"],["screen","monitor"],["display","monitor"],["mousepad","touchpad"],["earbuds","headphones"],["earphones","headphones"],["gpu","graphics card"],["gfx","graphics card"],["cpu","processor"],["ram","memory"],["ssd","drive"],["hdd","drive"],["hard disk","drive"],["hard drive","drive"],["flash drive","usb drive"],["thumb drive","usb drive"]],ru:[["пк","компьютер"],["комп","компьютер"],["компик","компьютер"],["ноут","ноутбук"],["ноутик","ноутбук"],["вайфай","wifi"],["вай фай","wifi"],["инет","интернет"],["тормозит","медленно"],["тупит","медленно"],["лагает","медленно"],["завис","зависает"],["виснет","зависает"],["не пашет","не работает"],["не фурычит","не работает"],["сдох","не работает"],["умер","не работает"],["сломался","не работает"],["сломалась","не работает"],["моник","монитор"],["экран","монитор"],["мышка","мышь"],["клава","клавиатура"],["видюха","видеокарта"],["видяха","видеокарта"],["gpu","видеокарта"],["проц","процессор"],["cpu","процессор"],["оперативка","оперативная память"],["озу","оперативная память"],["ram","оперативная память"],["хард","диск"],["винт","диск"],["ssd","диск"],["hdd","диск"],["флешка","usb накопитель"]],fi:[["pc","tietokone"],["kone","tietokone"],["läppäri","kannettava"],["wlan","wifi"],["netti","internet"],["lagaa","hidas"],["jumittaa","jumiutuu"],["ei pelitä","ei toimi"],["ei pelaa","ei toimi"],["hajosi","ei toimi"],["kuoli","ei toimi"],["näyttis","näytönohjain"],["gpu","näytönohjain"],["prossu","prosessori"],["cpu","prosessori"],["ram","keskusmuisti"],["ssd","levy"],["hdd","levy"],["tikku","usb tikku"]]};
function smartCanon(s,l){let x=" "+normalize(s)+" ",set=SMART_ALIASES[l]||SMART_ALIASES.en;for(const [a,b] of set){let f=" "+normalize(a)+" ";while(x.includes(f))x=x.split(f).join(" "+b+" ")}return x.replace(/\s+/g," ").trim()}
function smartEdit(a,b){if(a===b)return 0;let v=Array.from({length:b.length+1},(_,i)=>i);for(let i=1;i<=a.length;i++){let prev=v[0];v[0]=i;for(let j=1;j<=b.length;j++){let old=v[j],c=a[i-1]===b[j-1]?0:1;v[j]=Math.min(v[j]+1,v[j-1]+1,prev+c);prev=old}}return v[b.length]}
function smartNear(a,b){if(a===b)return true;if(Math.min(a.length,b.length)<4)return false;let d=smartEdit(a,b),m=Math.max(a.length,b.length);return d<=1||(m>=7&&d<=2)}
function smartMatch(raw,l){let q=smartCanon(raw,l),qt=q.split(" ").filter(Boolean),best=null,bs=0;for(const it of SMART_INTENTS)for(const p of it.p){let z=smartCanon(p,l),zt=z.split(" ").filter(Boolean),s=0;if(q===z)s=100;else if(it.t==="chat"&&zt.length===1)s=0;else if(q.includes(z)&&z.length>=4)s=90;else{let m=zt.filter(a=>qt.some(b=>smartNear(a,b)||a===b)).length,r=zt.length?m/zt.length:0;if(r>=.85)s=84;else if(r>=.7&&zt.length>=2)s=76;else if(r>=.6&&zt.length>=3)s=68}if(s>bs){bs=s;best=it}}return bs>=74?best:null}
function smartAnswer(it,l){if(it.kid){let k=knowledge.find(x=>x.id===it.kid);if(k&&k.a&&k.a[l])return k.a[l]}let a=it.a&&it.a[l]?it.a[l]:it.a&&it.a.en?it.a.en:null;if(Array.isArray(a))return a[Math.floor(Math.random()*a.length)];return a}


function contextualFollowup(q,l){
  let x=smartCanon(q,l),shorts=["how","how exactly","how do i do it","show me how","what do i click","what next","как","как именно","как это сделать","покажи как","что нажать","что дальше","miten","miten tarkalleen","mitä painan","mitä seuraavaksi"];
  if(shorts.some(v=>x===smartCanon(v,l))&&previousCategory){
    let id=previousCategory.id||previousCategory;
    let z=knowledge.find(v=>v.id===id);
    if(z)return z.a[l]||z.a.en;
  }
  return null;
}


function directCoreIntent(q,l){
  let x=smartCanon(q,l);

  let reinstallWords={
    en:["reinstall windows","how to reinstall windows","install windows again","reset windows","clean install windows"],
    ru:["переустановить windows","как переустановить windows","установить windows заново","поставить windows заново","чистая установка windows"],
    fi:["asenna windows uudelleen","miten asentaa windows uudelleen","windowsin uudelleenasennus","puhdas windows asennus"]
  };

  let usbWords={
    en:["how with usb","reinstall windows with usb","install windows from usb","clean install from usb"],
    ru:["как через usb","как через флешку","переустановить windows через флешку","установить windows с usb"],
    fi:["miten usb:llä","asenna windows usb:llä","windows asennus usb muistilta"]
  };

  let has=(arr)=>arr.some(v=>{
    let z=smartCanon(v,l);
    return x===z || x.includes(z);
  });

  if(has(usbWords[l]||usbWords.en)){
    let z=knowledge.find(v=>v.id==="reinstallUsb");
    if(z)return z;
  }

  if(has(reinstallWords[l]||reinstallWords.en)){
    let z=knowledge.find(v=>v.id==="windowsInstall");
    if(z)return z;
  }

  return null;
}


function specialistIntent(q,l){
  let x=smartCanon(q,l);
  const all=[
    "contact a specialist","contact specialist","talk to a specialist","speak to a specialist","need a specialist","human support","talk to a person","real person","technician","contact technician",
    "связаться со специалистом","поговорить со специалистом","нужен специалист","хочу специалиста","живой человек","реальный человек","связаться с мастером","нужен мастер",
    "ota yhteyttä asiantuntijaan","yhteys asiantuntijaan","haluan asiantuntijan","tarvitsen asiantuntijan","puhu asiantuntijalle","oikea ihminen","tarvitsen teknikon"
  ];
  return all.some(v=>{
    let z=smartCanon(v,l);
    return x===z||x.includes(z);
  });
}


function guidedChatIntent(q,l){
  let x=normalize(q);
  const G=[
    {p:["hi","hello","hey","hiya","yo","sup","good morning","good afternoon","good evening","привет","здравствуй","здравствуйте","доброе утро","добрый день","hei","moi","moikka","terve"],
     a:{en:["Hi 👋 I’m ANITA. Nice to meet you. What’s going on with your computer?","Hello 😊 I’m ready to help. Tell me what your PC, laptop or Windows is doing."],ru:["Привет 👋 Я ANITA. Расскажи, что происходит с компьютером или ноутбуком.","Здравствуйте 😊 Я готова помочь. Опишите проблему с ПК, Windows или устройством обычными словами."],fi:["Hei 👋 Olen ANITA. Kerro mitä tietokoneelle tai kannettavalle tapahtuu.","Moi 😊 Olen valmis auttamaan. Kuvaile PC:n, Windowsin tai laitteen ongelma omin sanoin."]}},
    {p:["how are you","how r u","how are u","how are you anita","you good","what's up","whats up","как дела","как ты","как дела анита","mitä kuuluu","miten menee","kuinka voit"],
     a:{en:["Doing great 😊 Thanks for asking. Let’s get back to you — what computer problem can I help with?","All good here 👍 Now let’s focus on your situation. What isn’t working on your PC or laptop?"],ru:["Всё отлично 😊 Спасибо, что спросили. Давайте вернёмся к вашей ситуации — что не работает на компьютере?","У меня всё хорошо 👍 А теперь к вашей технике: с чем нужна помощь?"],fi:["Hyvin menee 😊 Kiitos kun kysyit. Palataan sinun tilanteeseesi — mikä tietokoneessa ei toimi?","Kaikki hyvin 👍 Keskitytään nyt ongelmaasi. Missä tarvitset tietokoneapua?"]}},
    {p:["i am good","im good","i'm good","doing good","i am fine","im fine","i'm fine","good thanks","pretty good","я в порядке","у меня все хорошо","у меня всё хорошо","нормально","все хорошо","всё хорошо","olen kunnossa","minulla menee hyvin","ihan hyvin"],
     a:{en:["Glad to hear it 😊 Let’s get back to the reason you opened ANITA. What would you like help with on your computer?","Nice 😊 Now, back to your PC or laptop — what are we fixing or setting up?"],ru:["Рада слышать 😊 Давайте вернёмся к тому, зачем вы открыли ANITA. С чем помочь на компьютере?","Отлично 😊 А теперь обратно к ПК или ноутбуку — что будем настраивать или исправлять?"],fi:["Mukava kuulla 😊 Palataan siihen, miksi avasit ANITAn. Missä tietokoneasiassa tarvitset apua?","Hienoa 😊 Palataan PC:hen tai kannettavaan — mitä korjataan tai asetetaan?"]}},
    {p:["thanks","thank you","thx","ty","thanks anita","thank you anita","спасибо","благодарю","спс","kiitos","kiitti"],
     a:{en:["You’re welcome 😊 If the issue isn’t fully solved yet, tell me what still happens and we’ll continue.","Happy to help 👍 If there’s another computer problem, describe it and we’ll work through it."],ru:["Пожалуйста 😊 Если проблема ещё не решена полностью, расскажите, что происходит сейчас, и продолжим.","Рада помочь 👍 Если есть ещё вопрос по компьютеру, просто опишите его."],fi:["Ole hyvä 😊 Jos ongelma ei ole vielä täysin ratkennut, kerro mitä tapahtuu nyt ja jatketaan.","Mukava auttaa 👍 Jos on toinen tietokoneongelma, kuvaile se vain."]}},
    {p:["ok","okay","alright","got it","i see","understood","sure","ок","окей","понял","поняла","ясно","ладно","хорошо","selvä","okei","ymmärsin"],
     a:{en:["Got it 👍 What happens now when you try it?","Okay. Let’s continue with the computer issue — what changed after that step?"],ru:["Поняла 👍 Что теперь происходит, когда вы пробуете это сделать?","Хорошо. Продолжим с проблемой — что изменилось после этого шага?"],fi:["Selvä 👍 Mitä tapahtuu nyt kun kokeilet sitä?","Hyvä. Jatketaan ongelmaa — mikä muuttui tämän vaiheen jälkeen?"]}},
    {p:["i dont know","i don't know","idk","dunno","not sure","no idea","не знаю","без понятия","не уверен","не уверена","en tiedä","en ole varma"],
     a:{en:["That’s okay — you don’t need technical words. Tell me what you see on the screen and what you expected the computer to do.","No problem 😊 Start with the simplest thing: what happens when you press the button or open the program?"],ru:["Ничего страшного — технические термины не нужны. Расскажите, что видите на экране и что компьютер должен был сделать.","Без проблем 😊 Начните с самого простого: что происходит, когда нажимаете кнопку или открываете программу?"],fi:["Ei haittaa — teknisiä termejä ei tarvita. Kerro mitä näytöllä näkyy ja mitä tietokoneen piti tehdä.","Ei ongelmaa 😊 Aloita yksinkertaisesti: mitä tapahtuu kun painat painiketta tai avaat ohjelman?"]}},
    {p:["bye","goodbye","see you","later","пока","до свидания","до встречи","näkemiin","heippa","nähdään"],
     a:{en:["See you 👋 I hope the computer behaves. Come back if you need more IT help."],ru:["До встречи 👋 Надеюсь, техника будет вести себя хорошо. Возвращайтесь, если понадобится IT-помощь."],fi:["Nähdään 👋 Toivottavasti tietokone käyttäytyy. Tule takaisin jos tarvitset lisää IT-apua."]}}
  ];
  function phraseMatch(message, phrase){
    const m=normalize(message), p=normalize(phrase);
    if(!m||!p)return false;
    if(m===p)return true;

    // Never match very short chat words inside another word:
    // "hi" must not match "this", "ok" must not match "broken", etc.
    const esc=p.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
    const boundary=new RegExp("(^|\\s)"+esc+"(?=\\s|$)","i");

    // Greetings/chat replies are allowed only as whole/standalone phrases.
    // If the user writes "hi, my laptop is overheating", do NOT consume
    // the whole message as a greeting; let the IT matcher handle the problem.
    return boundary.test(m) && m.split(/\s+/).length <= p.split(/\s+/).length + 1;
  }

  for(const g of G)for(const p of g.p){
    if(phraseMatch(x,p))return g.a[l]||g.a.en;
  }
  return null;
}
function guidedChatAnswer(a){return a[Math.floor(Math.random()*a.length)]}


/* ================= ANITA ADAPTIVE SUPPORT LAYER v7 =================
   Deterministic (no external AI/API).
   Goals:
   - understand casual language/slang and mild profanity
   - detect confusion/frustration and respond politely
   - ask useful navigation questions
   - use concept-based matching instead of exact phrases only
   - add more Windows/software/Microsoft 365/home-IT knowledge
   - escalate advanced/high-risk cases to existing human-support cards
   - add light humor occasionally, without turning ANITA into a chat toy
   =================================================================== */
(function(){
  const V = {};
  V.lastIntent = null;
  V.lastAnswer = null;
  V.lastUserText = null;
  V.lastSubject = null;
  V.turns = 0;

  V.lang = function(l){ return ["ru","fi","en"].includes(l) ? l : "en"; };

  V.pick = function(arr){
    if(!Array.isArray(arr)) return arr;
    return arr[Math.floor(Math.random()*arr.length)];
  };

  // About 25% chance of a tiny friendly joke when the context allows it.
  V.humor = function(l){
    if(Math.random() >= 0.25) return "";
    const h = {
      en:[
        " Computers do have a talent for choosing the worst possible moment 😄",
        " Tiny digital drama — we’ll sort it out 😄",
        " No ritual sacrifice to the PC gods yet; let’s check the simple things first 😄"
      ],
      ru:[
        " Компьютеры умеют выбирать самый неподходящий момент 😄",
        " Небольшая цифровая драма — разберёмся 😄",
        " Танцы с бубном пока отменяем — сначала проверим простые вещи 😄"
      ],
      fi:[
        " Tietokoneet osaavat kyllä valita huonoimman mahdollisen hetken 😄",
        " Pieni digitaalinen draama — selvitetään se 😄",
        " Ei vielä rituaaleja tietokonejumalille — tarkistetaan ensin helpot asiat 😄"
      ]
    };
    return V.pick(h[V.lang(l)]);
  };

  V.rawNormalize = function(s){
    return (s||"").toLowerCase()
      .replace(/[’`]/g,"'")
      .replace(/\s+/g," ")
      .trim();
  };

  // Slang here is intentionally compact: we normalize concepts, not every possible sentence.
  V.expandSlang = function(s){
    let t = V.rawNormalize(s);
    const replacements = [
      [/\b(dafuck|dafuq|dafug|da fuck|wtf|wth)\b/gi, " what is going on "],
      [/\b(kinda|sorta)\b/gi, " kind of "],
      [/\b(idk|dunno)\b/gi, " i do not know "],
      [/\b(cant)\b/gi, " cannot "],
      [/\b(wont)\b/gi, " will not "],
      [/\b(doesnt)\b/gi, " does not "],
      [/\b(isnt)\b/gi, " is not "],
      [/\b(im)\b/gi, " i am "],
      [/\b(lappy|notebook)\b/gi, " laptop "],
      [/\b(comp|rig|machine)\b/gi, " computer "],
      [/\b(net|wifi|wi-fi|wlan)\b/gi, " internet "],
      [/\b(hustle|hassle|mess|issue|problem|trouble)\b/gi, " problem "],
      [/\b(laggy|sluggish|lagging|stuttery)\b/gi, " slow "],
      [/\b(glitching|glitchy|glitches|bugging out|acting weird|acting strange|freaking out)\b/gi, " behaving strangely "],
      [/\b(dead|died|borked|busted|broken)\b/gi, " not working "],
      [/\b(hella hot|super hot|too hot|heating up|gets hot|getting hot)\b/gi, " overheating "],
      [/\b(what the hell|what is going on)\b/gi, " confused "]
    ];
    for(const [r,to] of replacements) t=t.replace(r,to);
    return t.replace(/\s+/g," ").trim();
  };

  V.hasAny = function(t, arr){ return arr.some(x => t.includes(x)); };

  V.detectEmotion = function(text){
    const t=V.rawNormalize(text);
    const profanity = /\b(fuck|fucking|shit|damn|crap|bullshit|wtf|wth|dafuck|dafuq|dafug|бля|блин|сука|пизд|хуй|нахуй|черт|чёрт|vittu|perkele|saatana)\b/i.test(t);
    const angry = profanity || /\b(angry|mad|pissed|annoyed|furious|hate this|stupid computer|раздраж|бесит|задолб|достал|ненавиж|ärsyttää|vihainen|raivostuttaa)\b/i.test(t);
    const confused = /\b(confused|do not understand|don't understand|dont understand|no idea|what is this|what is going on|what does this mean|what do i do|how the hell|i'm lost|im lost|i am lost|не понимаю|что это|что делать|что происходит|без понятия|потерялся|непонятно|en ymmärrä|mikä tämä|mitä teen|mitä tapahtuu|olen hukassa)\b/i.test(V.expandSlang(t));
    return {angry,confused,profanity};
  };

  V.concepts = {
    overheating:{
      device:["laptop","computer","pc","ноут","ноутбук","комп","компьютер","пк","läppäri","kone","tietokone"],
      symptom:["overheating","overheat","hot","temperature","перегрев","греется","горяч","температур","ylikuum","kuuma","lämpö"],
      answer:{
        en:"Your laptop sounds like it may be overheating. Try this step by step:\n1. If it is extremely hot, shuts down, or smells unusual, turn it off and let it cool.\n2. Put it on a hard flat surface — not a bed, blanket or sofa.\n3. Check that the air vents are not blocked.\n4. Press Ctrl+Shift+Esc → Task Manager and look for a process using unusually high CPU.\n5. Restart the laptop and install Windows/driver updates.\n6. If you are comfortable doing so, clean dust from external vents with the laptop powered off.\n7. If it still overheats during light use, the cooling system may need internal cleaning/service.\n\nTell me: does it get hot only while gaming/heavy work, or even when almost nothing is open?",
        ru:"Похоже, ноутбук перегревается. Давайте по шагам:\n1. Если он очень горячий, сам выключается или появился необычный запах — выключите его и дайте остыть.\n2. Поставьте на твёрдую ровную поверхность, не на кровать/одеяло/диван.\n3. Проверьте, не перекрыты ли вентиляционные отверстия.\n4. Нажмите Ctrl+Shift+Esc → Диспетчер задач и посмотрите, нет ли процесса с очень высокой загрузкой CPU.\n5. Перезагрузите ноутбук и установите обновления Windows/драйверов.\n6. При выключенном ноутбуке аккуратно очистите внешние вентиляционные отверстия от пыли.\n7. Если он сильно греется даже при лёгкой работе, системе охлаждения может понадобиться внутренняя чистка/обслуживание.\n\nУточните: он греется только в играх/при нагрузке или даже когда почти ничего не открыто?",
        fi:"Kannettava vaikuttaa ylikuumenevan. Kokeile vaiheittain:\n1. Jos se on erittäin kuuma, sammuu itsestään tai haisee oudolta, sammuta se ja anna jäähtyä.\n2. Käytä sitä kovalla tasaisella alustalla, ei sängyllä tai peitolla.\n3. Varmista, etteivät ilmanvaihtoaukot ole tukossa.\n4. Avaa Tehtävienhallinta (Ctrl+Shift+Esc) ja tarkista poikkeuksellisen korkea CPU-kuormitus.\n5. Käynnistä kone uudelleen ja asenna Windows-/ajuripäivitykset.\n6. Puhdista ulkoiset ilmanvaihtoaukot varovasti kone sammutettuna.\n7. Jos kone kuumenee kevyessäkin käytössä, jäähdytys voi tarvita sisäistä huoltoa.\n\nKuumeneeko se vain pelatessa/raskaassa käytössä vai myös lähes tyhjäkäynnillä?"
      }
    },
    wifi_drop:{
      device:["internet","wifi","wi-fi","wlan","netti","verkko","интернет","вайфай","wifi"],
      symptom:["disconnect","drops","keeps dropping","cuts out","unstable","randomly","пропадает","отваливается","обрывается","нестабил","katkeaa","pätkii","epävakaa"],
      answer:{
        en:"If Wi-Fi keeps disconnecting:\n1. Check whether the same thing happens on another device.\n2. Restart the router and the PC.\n3. Forget the Wi-Fi network and reconnect.\n4. Move closer to the router for a test.\n5. In Device Manager → Network adapters, update the Wi-Fi driver.\n6. If only this PC disconnects, the adapter/driver/power-saving settings are likely involved.\n7. If every device disconnects, the router or ISP connection is more likely.\n\nDoes the internet drop on your phone too, or only on this computer?",
        ru:"Если Wi-Fi постоянно отваливается:\n1. Проверьте, происходит ли это на другом устройстве.\n2. Перезагрузите роутер и компьютер.\n3. Забудьте Wi-Fi сеть и подключитесь заново.\n4. Для проверки подойдите ближе к роутеру.\n5. В Диспетчере устройств → Сетевые адаптеры обновите драйвер Wi-Fi.\n6. Если проблема только на этом ПК, вероятны адаптер/драйвер/энергосбережение.\n7. Если связь пропадает на всех устройствах, вероятнее роутер или провайдер.\n\nНа телефоне интернет тоже пропадает или только на компьютере?",
        fi:"Jos Wi-Fi katkeilee:\n1. Tarkista tapahtuuko sama toisella laitteella.\n2. Käynnistä reititin ja tietokone uudelleen.\n3. Unohda Wi-Fi-verkko ja yhdistä uudelleen.\n4. Testaa lähempänä reititintä.\n5. Päivitä Wi-Fi-ajuri Laitehallinnasta.\n6. Jos vain tämä tietokone katkeilee, syy on todennäköisesti sovittimessa, ajurissa tai virransäästössä.\n7. Jos kaikki laitteet katkeilevat, syy on todennäköisemmin reitittimessä tai operaattorissa.\n\nKatkeaako netti myös puhelimesta vai vain tältä tietokoneelta?"
      }
    },
    slow_start:{
      device:["computer","pc","laptop","windows","компьютер","пк","ноутбук","windows","tietokone","kone","läppäri"],
      symptom:["slow boot","slow start","starts slowly","takes forever to start","boot takes","долго загружается","медленно включается","долгая загрузка","käynnistyy hitaasti","käynnistys hidas"],
      answer:{
        en:"For a slow Windows startup:\n1. Open Task Manager → Startup apps and disable non-essential high-impact apps.\n2. Check that the system drive has at least roughly 15–20% free space.\n3. Install Windows updates and restart.\n4. Run a Windows Security scan.\n5. If the PC still uses an old HDD, moving Windows to an SSD can make a very large difference.\n6. If startup suddenly became slow, tell me what changed just before it started.",
        ru:"Если Windows долго загружается:\n1. Откройте Диспетчер задач → Автозагрузка и отключите ненужные программы с высоким влиянием.\n2. Проверьте, чтобы на системном диске оставалось примерно 15–20% свободного места.\n3. Установите обновления Windows и перезагрузитесь.\n4. Запустите проверку Безопасностью Windows.\n5. Если система стоит на старом HDD, переход на SSD может очень сильно ускорить загрузку.\n6. Если проблема появилась внезапно, напишите, что менялось перед этим.",
        fi:"Jos Windows käynnistyy hitaasti:\n1. Avaa Tehtävienhallinta → Käynnistyssovellukset ja poista tarpeettomat suuren vaikutuksen ohjelmat käytöstä.\n2. Varmista, että järjestelmälevyllä on noin 15–20 % vapaata tilaa.\n3. Asenna Windows-päivitykset ja käynnistä uudelleen.\n4. Suorita Windowsin suojauksen tarkistus.\n5. Jos käytössä on vanha HDD, SSD voi nopeuttaa käynnistystä huomattavasti.\n6. Jos hidastuminen alkoi äkillisesti, kerro mitä muuttui juuri ennen sitä."
      }
    }
  };

  V.office = [
    {
      id:"word_save_pdf",
      patterns:[/word.*(pdf|save as pdf|export)/i,/(ворд|word).*(pdf|пдф)/i,/word.*pdf/i],
      a:{
        en:"In Microsoft Word: File → Save As (or Export) → choose PDF → select location → Save. If you need only certain pages, use File → Print → Microsoft Print to PDF and choose the page range.",
        ru:"В Microsoft Word: Файл → Сохранить как (или Экспорт) → выберите PDF → место сохранения → Сохранить. Если нужны только отдельные страницы, можно использовать Файл → Печать → Microsoft Print to PDF и указать диапазон страниц.",
        fi:"Microsoft Wordissa: Tiedosto → Tallenna nimellä (tai Vie) → valitse PDF → sijainti → Tallenna. Jos tarvitset vain tietyt sivut, käytä Tiedosto → Tulosta → Microsoft Print to PDF ja valitse sivualue."
      }
    },
    {
      id:"word_recover",
      patterns:[/word.*(recover|unsaved|lost document)/i,/(word|ворд).*(не сохрани|потерял.*документ|восстанов)/i,/word.*(palauta|tallentamaton)/i],
      a:{
        en:"To recover an unsaved Word document: open Word → File → Info → Manage Document → Recover Unsaved Documents. Also check File → Open → Recent. If AutoRecover was enabled, Word may offer a recovered copy after reopening.",
        ru:"Чтобы восстановить несохранённый документ Word: Word → Файл → Сведения → Управление документом → Восстановить несохранённые документы. Также проверьте Файл → Открыть → Последние. При включённом AutoRecover Word может предложить восстановленную копию после запуска.",
        fi:"Tallentamattoman Word-tiedoston palautus: Word → Tiedosto → Tiedot → Hallitse asiakirjaa → Palauta tallentamattomat asiakirjat. Tarkista myös Tiedosto → Avaa → Viimeisimmät."
      }
    },
    {
      id:"excel_formula",
      patterns:[/excel.*(formula|sum|average)/i,/(excel|эксель).*(формул|сумм|средн)/i,/excel.*(kaava|summa|keskiarvo)/i],
      a:{
        en:"In Excel, formulas start with =. Examples: =SUM(A1:A10) adds values; =AVERAGE(A1:A10) calculates the average; =IF(A1>10,\"Yes\",\"No\") makes a simple condition. Tell me what you want the sheet to calculate and I can show the exact formula.",
        ru:"В Excel формулы начинаются со знака =. Примеры: =SUM(A1:A10) складывает значения; =AVERAGE(A1:A10) считает среднее; =IF(A1>10,\"Yes\",\"No\") создаёт простое условие. Напишите, что именно таблица должна вычислять, и я подскажу формулу.",
        fi:"Excel-kaavat alkavat =-merkillä. Esim. =SUM(A1:A10) laskee summan, =AVERAGE(A1:A10) keskiarvon ja =IF(A1>10,\"Yes\",\"No\") tekee yksinkertaisen ehdon. Kerro mitä haluat laskea, niin voin ehdottaa kaavan."
      }
    },
    {
      id:"excel_freeze",
      patterns:[/excel.*(freeze|not responding|crash)/i,/(excel|эксель).*(завис|не отвечает|вылет)/i,/excel.*(jumittaa|ei vastaa|kaatuu)/i],
      a:{
        en:"If Excel freezes: wait a moment if the file is large, then check Task Manager. Reopen Excel in Safe Mode with Win+R → excel /safe. Disable suspicious add-ins, update Office, and try File → Open → Browse → Open and Repair for a damaged workbook.",
        ru:"Если Excel зависает: подождите немного, если файл большой, затем проверьте Диспетчер задач. Запустите Excel в безопасном режиме: Win+R → excel /safe. Отключите подозрительные надстройки, обновите Office и попробуйте Файл → Открыть → Обзор → Открыть и восстановить.",
        fi:"Jos Excel jumittuu: odota hetki suuren tiedoston kanssa ja tarkista Tehtävienhallinta. Käynnistä Excel vikasietotilassa: Win+R → excel /safe. Poista epäilyttävät lisäosat, päivitä Office ja kokeile Avaa ja korjaa -toimintoa."
      }
    },
    {
      id:"powerpoint_present",
      patterns:[/powerpoint.*(present|slideshow|slide show|second screen)/i,/(powerpoint|пауэрпоинт).*(показ|презентац|второй экран)/i,/powerpoint.*(diaesitys|toinen näyttö)/i],
      a:{
        en:"For a PowerPoint presentation: Slide Show → From Beginning (F5) or From Current Slide (Shift+F5). With a projector/second screen, press Win+P and normally choose Extend, then use Presenter View if you want notes on your screen.",
        ru:"Для показа PowerPoint: Показ слайдов → С начала (F5) или С текущего слайда (Shift+F5). С проектором/вторым экраном нажмите Win+P и обычно выберите «Расширить», затем при необходимости используйте режим докладчика.",
        fi:"PowerPoint-esityksessä: Diaesitys → Alusta (F5) tai Nykyisestä diasta (Shift+F5). Projektorin/toisen näytön kanssa paina Win+P ja valitse yleensä Laajenna; tarvittaessa käytä Esittäjänäkymää."
      }
    },
    {
      id:"outlook_mail",
      patterns:[/outlook.*(not receiving|not sending|send receive|mail stuck)/i,/(outlook|аутлук).*(не получает|не отправляет|письм|застрял)/i,/outlook.*(ei lähetä|ei vastaanota|posti)/i],
      a:{
        en:"For Outlook send/receive problems:\n1. Check internet access and open your mailbox in webmail.\n2. Make sure Outlook is not in Work Offline mode.\n3. Check Outbox for a large/stuck message.\n4. Restart Outlook.\n5. Verify the account password and mailbox storage.\n6. If webmail works but Outlook does not, the local Outlook profile/app needs attention.",
        ru:"Если Outlook не отправляет/получает почту:\n1. Проверьте интернет и откройте ящик через веб-почту.\n2. Убедитесь, что Outlook не в автономном режиме.\n3. Проверьте Исходящие — не застряло ли большое письмо.\n4. Перезапустите Outlook.\n5. Проверьте пароль и свободное место в ящике.\n6. Если веб-почта работает, а Outlook нет — проблема скорее в локальном профиле/приложении.",
        fi:"Jos Outlook ei lähetä/vastaanota:\n1. Tarkista internet ja webmail.\n2. Varmista ettei Offline-tila ole päällä.\n3. Tarkista Lähtevät-kansio jumittuneen suuren viestin varalta.\n4. Käynnistä Outlook uudelleen.\n5. Tarkista salasana ja postilaatikon tila.\n6. Jos webmail toimii mutta Outlook ei, ongelma on todennäköisesti paikallisessa profiilissa/sovelluksessa."
      }
    },
    {
      id:"office_repair",
      patterns:[/(office|word|excel|powerpoint|outlook).*(repair|broken|not opening)/i,/(office|word|excel|powerpoint|outlook).*(почин|не открывается|сломал)/i,/(office|word|excel|powerpoint|outlook).*(korjaa|ei avaudu)/i],
      a:{
        en:"To repair Microsoft Office in Windows: Settings → Apps → Installed apps → Microsoft 365/Office → … → Modify. Try Quick Repair first; if that does not help, use Online Repair. Save your work and close Office apps before repairing.",
        ru:"Чтобы восстановить Microsoft Office в Windows: Параметры → Приложения → Установленные приложения → Microsoft 365/Office → … → Изменить. Сначала попробуйте «Быстрое восстановление», а если не поможет — «Восстановление по сети». Перед этим сохраните документы и закройте Office.",
        fi:"Microsoft Officen korjaus Windowsissa: Asetukset → Sovellukset → Asennetut sovellukset → Microsoft 365/Office → … → Muokkaa. Kokeile ensin Pikakorjausta ja tarvittaessa Online-korjausta. Tallenna työsi ja sulje Office-sovellukset ensin."
      }
    }
  ];

  V.software = [
    {
      id:"install_program",
      patterns:[/\b(how|help|want|need).*(install|setup).*(program|app|software)\b/i,/\binstall (a )?(program|app|software)\b/i,/(как|хочу|нужно).*(установить|инсталл).*(программ|прилож)/i,/(miten|haluan).*(asenna|asentaa).*(ohjelma|sovellus)/i],
      a:{
        en:"To install a program safely on Windows:\n1. Prefer the Microsoft Store or the software maker’s official website.\n2. Download the installer that matches your Windows version/architecture.\n3. Open the downloaded .exe/.msi file.\n4. Read each installer screen; avoid optional toolbars or bundled apps you do not want.\n5. Accept the license only if you agree, choose the install location if needed, then Install.\n6. If Windows SmartScreen warns about an unknown publisher, stop and verify the source before continuing.\n\nTell me the program name and I can guide you more specifically.",
        ru:"Чтобы безопасно установить программу в Windows:\n1. Лучше использовать Microsoft Store или официальный сайт разработчика.\n2. Скачайте установщик для вашей версии Windows.\n3. Откройте скачанный .exe/.msi.\n4. Читайте шаги установки и снимайте галочки с ненужных дополнительных программ/панелей.\n5. При необходимости выберите папку и нажмите Установить.\n6. Если SmartScreen предупреждает о неизвестном издателе, остановитесь и проверьте источник.\n\nНапишите название программы — подскажу точнее.",
        fi:"Ohjelman turvallinen asennus Windowsiin:\n1. Suosi Microsoft Storea tai valmistajan virallista sivua.\n2. Lataa Windows-versiollesi sopiva asennusohjelma.\n3. Avaa .exe/.msi.\n4. Lue vaiheet ja poista valinnat turhista lisäohjelmista.\n5. Valitse tarvittaessa kansio ja Asenna.\n6. Jos SmartScreen varoittaa tuntemattomasta julkaisijasta, pysähdy ja varmista lähde.\n\nKerro ohjelman nimi, niin voin neuvoa tarkemmin."
      }
    },
    {
      id:"uninstall_program",
      patterns:[/\b(uninstall|remove|delete).*(program|app|software)\b/i,/(удалить|деинсталл).*(программ|прилож)/i,/(poista|poistaa).*(ohjelma|sovellus)/i],
      a:{
        en:"To uninstall a program in Windows 11/10: Start → Settings → Apps → Installed apps → find the program → … → Uninstall. You can also right-click an app in Start → Uninstall. Some classic programs can be removed via Control Panel → Programs and Features. Restart if the uninstaller asks you to.",
        ru:"Чтобы удалить программу в Windows 11/10: Пуск → Параметры → Приложения → Установленные приложения → найдите программу → … → Удалить. Также можно нажать правой кнопкой по программе в Пуск → Удалить. Для некоторых классических программ: Панель управления → Программы и компоненты.",
        fi:"Ohjelman poistaminen Windows 11/10: Käynnistä → Asetukset → Sovellukset → Asennetut sovellukset → etsi ohjelma → … → Poista asennus. Vaihtoehtoisesti Käynnistä-valikossa hiiren oikea → Poista asennus. Vanhoille ohjelmille myös Ohjauspaneeli → Ohjelmat ja toiminnot."
      }
    },
    {
      id:"program_wont_open",
      patterns:[/(program|app|software).*(will not open|won't open|not opening|does not start|crashes)/i,/(программ|прилож).*(не открывается|не запускается|вылетает)/i,/(ohjelma|sovellus).*(ei avaudu|ei käynnisty|kaatuu)/i],
      a:{
        en:"If an app will not open:\n1. Restart the PC.\n2. Try launching it once as Administrator if appropriate.\n3. Install Windows updates and update the app.\n4. Settings → Apps → Installed apps → the app → Advanced options → Repair/Reset if available.\n5. Reinstall the app if its files may be damaged.\n6. If there is an error message, send me the exact wording/code.",
        ru:"Если программа не запускается:\n1. Перезагрузите ПК.\n2. При необходимости попробуйте один раз «Запуск от имени администратора».\n3. Установите обновления Windows и самой программы.\n4. Параметры → Приложения → Установленные приложения → программа → Дополнительные параметры → Исправить/Сбросить, если доступно.\n5. Переустановите программу, если её файлы повреждены.\n6. Если есть ошибка — пришлите точный текст/код.",
        fi:"Jos sovellus ei avaudu:\n1. Käynnistä tietokone uudelleen.\n2. Kokeile tarvittaessa kerran järjestelmänvalvojana.\n3. Päivitä Windows ja sovellus.\n4. Asetukset → Sovellukset → Asennetut sovellukset → sovellus → Lisäasetukset → Korjaa/Palauta, jos saatavilla.\n5. Asenna sovellus uudelleen, jos tiedostot ovat vioittuneet.\n6. Lähetä tarkka virheilmoitus/koodi."
      }
    }
  ];

  V.security = [
    {
      id:"remove_virus",
      patterns:[/\b(remove|get rid|clean).*(virus|malware|trojan)\b/i,/\b(virus|malware|trojan).*(remove|clean)\b/i,/(удалить|избавиться|очистить).*(вирус|троян|вредонос)/i,/(poista|puhdista).*(virus|haittaohjelma)/i],
      a:{
        en:"If you think the PC is infected:\n1. Disconnect from suspicious sites and stop entering passwords.\n2. Open Windows Security → Virus & threat protection → Scan options → Full scan.\n3. If needed, run Microsoft Defender Offline scan for stubborn malware.\n4. Remove suspicious browser extensions and recently installed unknown apps.\n5. Update Windows and browsers.\n6. Change important passwords from a known-clean device if you entered them while infected.\n7. If malware returns after removal or security tools are disabled, back up personal documents and consider professional help or a clean Windows reinstall.\n\nDo not install random 'virus cleaner' pop-ups — they are often part of the problem.",
        ru:"Если подозреваете заражение:\n1. Закройте подозрительные сайты и не вводите пароли.\n2. Безопасность Windows → Защита от вирусов и угроз → Параметры сканирования → Полная проверка.\n3. Для стойкого вредоносного ПО можно запустить автономную проверку Microsoft Defender.\n4. Удалите подозрительные расширения браузера и недавно установленные неизвестные программы.\n5. Обновите Windows и браузеры.\n6. Если вводили важные пароли во время заражения, смените их с заведомо чистого устройства.\n7. Если вирус возвращается или защита отключается сама, сохраните личные документы и рассмотрите помощь специалиста или чистую переустановку Windows.\n\nНе устанавливайте случайные «virus cleaner» из всплывающей рекламы — они сами могут быть вредоносными.",
        fi:"Jos epäilet haittaohjelmaa:\n1. Sulje epäilyttävät sivut äläkä syötä salasanoja.\n2. Windowsin suojaus → Virusten ja uhkien torjunta → Tarkistusasetukset → Täysi tarkistus.\n3. Tarvittaessa suorita Microsoft Defender Offline -tarkistus.\n4. Poista epäilyttävät selainlaajennukset ja tuntemattomat uudet ohjelmat.\n5. Päivitä Windows ja selaimet.\n6. Vaihda tärkeät salasanat puhtaalta laitteelta, jos käytit niitä tartunnan aikana.\n7. Jos haittaohjelma palaa tai suojaus sammuu itsestään, varmuuskopioi omat tiedostot ja harkitse ammattilaisen apua tai puhdasta Windows-asennusta.\n\nÄlä asenna satunnaisia ponnahdusikkunoiden 'virus cleanereita'."
      }
    },
    {
      id:"antivirus_recommendation",
      patterns:[/(best|good|recommend|which).*(antivirus|anti-virus)/i,/(какой|лучший|посоветуй|антивирус).*(антивирус|скачать|купить)?/i,/(paras|suosittele|mikä).*(virustorjunta|antivirus)/i],
      a:{
        en:"For a normal Windows 11 home PC, Microsoft Defender (built into Windows Security) is a good default and usually means you do not need to buy another antivirus. In AV-TEST's May–June 2026 Windows 11 test, Defender scored 6/6 for protection, 5.5/6 for performance and 6/6 for usability. If you specifically want a paid suite, Bitdefender, ESET and F-Secure also scored strongly in the same 2026 testing. My practical advice: start with Defender + automatic updates + browser protection + good backups, and buy a suite only if you need its extra features. Antivirus rankings change, so check a recent independent test before purchasing.",
        ru:"Для обычного домашнего ПК с Windows 11 встроенный Microsoft Defender (Безопасность Windows) — хороший базовый выбор, и большинству пользователей отдельный платный антивирус не обязателен. В тесте AV-TEST для Windows 11 за май–июнь 2026 Defender получил 6/6 за защиту, 5.5/6 за производительность и 6/6 за удобство. Если нужен именно платный пакет, Bitdefender, ESET и F-Secure также показали сильные результаты в тех же актуальных тестах 2026 года. Практичный вариант: Defender + автообновления + защита браузера + резервные копии; платный пакет имеет смысл ради дополнительных функций. Рейтинги меняются — перед покупкой лучше проверить свежий независимый тест.",
        fi:"Tavalliselle Windows 11 -kotikoneelle sisäänrakennettu Microsoft Defender (Windowsin suojaus) on hyvä oletus, eikä erillistä maksullista virustorjuntaa yleensä tarvita. AV-TESTin touko–kesäkuun 2026 Windows 11 -testissä Defender sai suojauksesta 6/6, suorituskyvystä 5,5/6 ja käytettävyydestä 6/6. Jos haluat maksullisen tietoturvapaketin, Bitdefender, ESET ja F-Secure menestyivät myös hyvin samoissa 2026 testeissä. Käytännössä: Defender + automaattiset päivitykset + selaimen suojaus + varmuuskopiot. Tarkista aina tuore riippumaton testi ennen ostoa, koska tulokset muuttuvat."
      }
    }
  ];

  V.moreKnowledge = [
    {
      id:"onedrive_sync",
      pats:[/onedrive.*(sync|not syncing|stuck|red x)/i,/(onedrive|ван драйв).*(не синх|завис|красн)/i,/onedrive.*(ei synk|jumissa|punainen)/i],
      a:{
        en:"For OneDrive sync trouble: check internet, click the OneDrive cloud icon and read the sync error, confirm you are signed into the correct account, check available OneDrive and local disk space, pause/resume syncing, then restart OneDrive. A red X usually means a specific file/folder needs attention.",
        ru:"При проблемах синхронизации OneDrive: проверьте интернет, нажмите значок облака OneDrive и прочитайте ошибку, убедитесь, что вошли в нужный аккаунт, проверьте место в OneDrive и на диске, поставьте синхронизацию на паузу и возобновите, затем перезапустите OneDrive. Красный X обычно указывает на конкретный проблемный файл/папку.",
        fi:"OneDrive-synkronointiongelmassa: tarkista internet, avaa OneDrive-pilvikuvake ja lue virhe, varmista oikea tili, tarkista pilvi- ja levytila, keskeytä/jatka synkronointia ja käynnistä OneDrive uudelleen. Punainen X viittaa yleensä tiettyyn tiedostoon/kansioon."
      }
    },
    {
      id:"printer_offline",
      pats:[/printer.*(offline|not printing|queue stuck)/i,/(принтер).*(офлайн|не печатает|очеред)/i,/(tulostin).*(offline|ei tulosta|jono)/i],
      a:{
        en:"If the printer is offline/not printing: confirm it is powered on and connected to the same Wi-Fi/USB, restart printer and PC, open Settings → Bluetooth & devices → Printers & scanners, open the printer queue and clear stuck jobs, then print a test page. If Windows cannot find it, remove and add the printer again.",
        ru:"Если принтер офлайн/не печатает: проверьте питание и подключение к тому же Wi-Fi или USB, перезагрузите принтер и ПК, откройте Параметры → Bluetooth и устройства → Принтеры и сканеры, очистите зависшие задания и напечатайте тестовую страницу. Если Windows его не находит, удалите принтер и добавьте заново.",
        fi:"Jos tulostin on offline/ei tulosta: tarkista virta ja sama Wi-Fi/USB, käynnistä tulostin ja tietokone uudelleen, avaa Asetukset → Bluetooth ja laitteet → Tulostimet ja skannerit, tyhjennä jumittuneet työt ja tulosta testisivu. Tarvittaessa poista tulostin ja lisää se uudelleen."
      }
    },
    {
      id:"no_sound",
      pats:[/(no sound|sound not working|audio not working)/i,/(нет звука|звук не работает)/i,/(ei ääntä|ääni ei toimi)/i],
      a:{
        en:"No sound? Check in this order: volume/mute → correct output device in Settings → System → Sound → reconnect headphones/speakers → restart the app → restart Windows → Device Manager audio driver. If sound works in headphones but not speakers, tell me — that narrows it down.",
        ru:"Нет звука? Проверяйте по порядку: громкость/Mute → правильное устройство вывода в Параметры → Система → Звук → переподключить наушники/колонки → перезапустить программу → Windows → проверить аудиодрайвер в Диспетчере устройств. Если в наушниках звук есть, а в динамиках нет — напишите, это сильно сужает причину.",
        fi:"Ei ääntä? Tarkista järjestyksessä: äänenvoimakkuus/mykistys → oikea toistolaite Asetukset → Järjestelmä → Ääni → kytke kuulokkeet/kaiuttimet uudelleen → käynnistä sovellus ja Windows uudelleen → tarkista ääniajuri Laitehallinnasta."
      }
    },
    {
      id:"file_association",
      pats:[/(open with|wrong program|default app|file opens in)/i,/(открывается не той программой|программа по умолчанию|чем открыть файл)/i,/(avaa väärällä ohjelmalla|oletussovellus|avaa sovelluksella)/i],
      a:{
        en:"To change which app opens a file: right-click the file → Open with → Choose another app → select the program → enable 'Always use this app' if offered. Or go to Settings → Apps → Default apps and choose defaults by file type.",
        ru:"Чтобы изменить программу для открытия файла: правой кнопкой по файлу → Открыть с помощью → Выбрать другое приложение → выберите программу → при необходимости отметьте «Всегда использовать это приложение». Или Параметры → Приложения → Приложения по умолчанию.",
        fi:"Tiedoston oletussovelluksen vaihto: hiiren oikea tiedoston päällä → Avaa sovelluksella → Valitse toinen sovellus → valitse ohjelma → valitse tarvittaessa aina käytettäväksi. Tai Asetukset → Sovellukset → Oletussovellukset."
      }
    }
  ];

  V.advanced = [
    {
      rx:/\b(smoke|sparks|burning smell|burnt smell|дым|искры|запах гари|пахнет горелым|savua|kipinö|palaneen haju)\b/i,
      m:{
        en:"This is no longer a normal software troubleshooting case. Shut the device down, unplug power if it is safe to do so, and do not keep testing it. It needs hands-on inspection.",
        ru:"Это уже не обычная программная проблема. Выключите устройство, безопасно отключите питание и не продолжайте эксперименты. Нужна очная диагностика.",
        fi:"Tämä ei ole enää tavallinen ohjelmisto-ongelma. Sammuta laite, irrota virta turvallisesti äläkä jatka testaamista. Laite tarvitsee paikan päällä tehtävän tarkastuksen."
      }
    },
    {
      rx:/\b(liquid spill|spilled water|coffee on laptop|water on laptop|залил ноут|пролил.*(воду|кофе|чай)|vesi.*kannettava|kahvi.*kannettava)\b/i,
      m:{
        en:"For a liquid spill: power the device off immediately, disconnect the charger, do not keep turning it on to 'check', and do not use a hair dryer. A hands-on inspection/cleaning is recommended, especially if liquid entered the keyboard or vents.",
        ru:"Если на устройство пролили жидкость: немедленно выключите его, отключите зарядку, не включайте снова «проверить» и не сушите феном. Желательна очная диагностика/чистка, особенно если жидкость попала под клавиатуру или в вентиляцию.",
        fi:"Nesteroiskeessa: sammuta laite heti, irrota laturi, älä käynnistä sitä uudelleen 'testiksi' äläkä käytä hiustenkuivaajaa. Ammattilaisen tarkastus/puhdistus on suositeltava."
      }
    },
    {
      rx:/\b(clicking hard drive|hard drive clicking|data recovery|drive not detected.*important|битые данные|восстановить данные.*диск|диск щелкает|kiintolevy naksahtaa|tietojen palautus)\b/i,
      m:{
        en:"Because important data may be at risk, avoid repeated power cycles, formatting, CHKDSK, or random recovery tools. This is a case where professional data-recovery/IT support is safer.",
        ru:"Поскольку важные данные могут быть под угрозой, не делайте много повторных включений, не форматируйте диск, не запускайте CHKDSK и случайные программы восстановления. Здесь безопаснее обратиться к специалисту.",
        fi:"Koska tärkeät tiedot voivat olla vaarassa, vältä toistuvia käynnistyksiä, alustamista, CHKDSK:ta ja satunnaisia palautustyökaluja. Ammattilaisen apu on turvallisempi."
      }
    }
  ];

  V.matchConcept = function(text,l){
    const t=V.expandSlang(text);
    for(const [id,c] of Object.entries(V.concepts)){
      let ds=c.device.some(x=>t.includes(x));
      let ss=c.symptom.some(x=>t.includes(x));
      if(ds && ss){
        V.lastIntent=id; V.lastAnswer=c.answer[V.lang(l)]||c.answer.en;
        return V.lastAnswer + V.humor(l);
      }
    }
    return null;
  };

  V.matchList = function(text,l,list,patternKey="patterns"){
    for(const x of list){
      const patterns=x[patternKey]||x.pats||[];
      if(patterns.some(r=>r.test(text))){
        V.lastIntent=x.id; V.lastAnswer=x.a[V.lang(l)]||x.a.en;
        return V.lastAnswer;
      }
    }
    return null;
  };

  V.isJoke = function(text){
    return /\b(just kidding|jk|lol|lmao|haha|hehe|joking|шучу|ахах|хаха|лол|vitsi|haha|heh)\b/i.test(text);
  };

  V.confusionReply = function(text,l){
    const lang=V.lang(l);
    const e=V.detectEmotion(text);
    if(!e.confused && !e.angry) return null;

    if(V.lastIntent && V.lastAnswer){
      const p={
        en:e.angry
          ?"I get that this is frustrating. Sorry if my previous explanation was unclear. Let me make it simpler: tell me which exact step confused you, or copy the message/error you see on screen."
          :"No problem — I can explain it more simply. Which part is unclear: what the term means, where to click, or what you should do next?",
        ru:e.angry
          ?"Понимаю, что это раздражает. Извините, если прошлое объяснение было непонятным. Давайте проще: напишите, какой именно шаг непонятен, или скопируйте сюда сообщение/ошибку с экрана."
          :"Без проблем — объясню проще. Что именно непонятно: значение термина, куда нажать или что делать дальше?",
        fi:e.angry
          ?"Ymmärrän, että tämä ärsyttää. Anteeksi jos aiempi ohjeeni oli epäselvä. Tehdään helpommin: kerro mikä vaihe on epäselvä tai kopioi näytöllä oleva virhe."
          :"Ei ongelmaa — selitän yksinkertaisemmin. Mikä on epäselvää: termin merkitys, mistä klikataan vai mitä tehdään seuraavaksi?"
      };
      return p[lang];
    }

    const p={
      en:e.angry
        ?"I can see this is frustrating. I’m not offended by the wording 🙂 I just need one concrete clue so I don’t send you down the wrong path: what device/program are you using, and what exactly is on the screen right now?"
        :"No worries — you don’t need IT terminology. Tell me 3 simple things: 1) what device/program you are using, 2) what you tried to do, 3) what happened instead.",
      ru:e.angry
        ?"Понимаю, что ситуация раздражает. На формулировку я не обижаюсь 🙂 Мне просто нужна одна конкретная зацепка, чтобы не вести вас не туда: какое устройство/программа и что сейчас видно на экране?"
        :"Ничего страшного — IT-термины не нужны. Напишите 3 простые вещи: 1) устройство/программа, 2) что пытались сделать, 3) что произошло вместо этого.",
      fi:e.angry
        ?"Ymmärrän, että tilanne ärsyttää. En loukkaannu sanavalinnoista 🙂 Tarvitsen vain yhden konkreettisen vihjeen: mikä laite/ohjelma on kyseessä ja mitä näytöllä näkyy nyt?"
        :"Ei huolta — IT-termejä ei tarvita. Kerro kolme asiaa: 1) laite/ohjelma, 2) mitä yritit tehdä, 3) mitä tapahtui sen sijaan."
    };
    return p[lang];
  };

  V.followup = function(text,l){
    const t=V.expandSlang(text);
    if(!V.lastIntent) return null;
    if(/\b(what do you mean|what does that mean|explain|simpler|how exactly|where is that|where do i|which one|how do i|что значит|объясни|проще|как именно|где это|куда нажать|что дальше|mitä tarkoitat|selitä|yksinkertaisemmin|miten tarkalleen|missä se on|mitä seuraavaksi)\b/i.test(t)){
      const x={
        en:"Sure. I’ll guide you one click at a time. Tell me what you currently see on the screen (for example: Windows desktop, Settings, an error window, browser, Word/Excel), and I’ll give only the next step.",
        ru:"Конечно. Давайте по одному шагу за раз. Напишите, что сейчас видите на экране (например: рабочий стол Windows, Параметры, окно ошибки, браузер, Word/Excel), и я дам только следующий шаг.",
        fi:"Totta. Mennään yksi klikkaus kerrallaan. Kerro mitä näytöllä näkyy juuri nyt (esim. Windows-työpöytä, Asetukset, virheikkuna, selain, Word/Excel), niin annan vain seuraavan vaiheen."
      };
      return x[V.lang(l)];
    }
    return null;
  };

  V.stripGreeting = function(text){
    return (text||"").replace(/^\s*(hi|hello|hey|hiya|yo|sup|good morning|good afternoon|good evening|привет|здравствуйте|здравствуй|hei|moi|moikka|terve)[,!:.\s-]*/i,"").trim();
  };

  V.handle = function(text,l){
    V.turns++;
    V.lastUserText=text;
    const afterGreeting=V.stripGreeting(text);
    if(afterGreeting && afterGreeting.length>=4) text=afterGreeting;

    // High-risk/advanced cases first.
    for(const a of V.advanced){
      if(a.rx.test(text)){
        return {type:"escalate", text:a.m[V.lang(l)]||a.m.en};
      }
    }

    const emotional=V.confusionReply(text,l);
    if(emotional) return {type:"answer",text:emotional};

    if(V.isJoke(text)){
      const j={
        en:["😄 Fair enough. Back to the computer before it gets any ideas — what are we fixing?","😂 I’ll allow it. Now tell me what the machine is doing."],
        ru:["😄 Засчитано. А теперь вернёмся к компьютеру, пока он не придумал новую проблему — что исправляем?","😂 Ладно, принимается. Теперь расскажите, что делает техника."],
        fi:["😄 Hyväksytään. Palataan koneeseen ennen kuin se keksii uuden ongelman — mitä korjataan?","😂 Selvä. Kerro nyt mitä kone tekee."]
      };
      return {type:"answer",text:V.pick(j[V.lang(l)])};
    }

    const follow=V.followup(text,l);
    if(follow) return {type:"answer",text:follow};

    // Natural short continuation after ANITA asked for details.
    // Example:
    // User: "I have this problem with my Windows"
    // ANITA: asks what happens
    // User: "it's glitching"
    // -> keep Windows as the subject and ask what "glitching" looks like.
    const shortT=V.expandSlang(text);
    if(V.lastSubject && /\b(behaving strangely|weird|strange|glitch|glitching|buggy|not right|messed up|frozen|freezing|slow|crash|crashing|error|not working)\b/i.test(shortT)){
      const s=V.lastSubject;
      const q={
        en:`Got it — ${s} is behaving strangely. “Glitching” can mean a few different things, so let’s narrow it down. Which is closest: 1) screen/graphics flicker, 2) programs freeze or close, 3) Windows becomes slow, 4) error messages appear, 5) mouse/keyboard behave oddly, or 6) something else?`,
        ru:`Поняла — ${s} ведёт себя странно. Под «глючит» может скрываться несколько разных проблем. Что ближе: 1) мигает/искажается изображение, 2) программы зависают или закрываются, 3) Windows тормозит, 4) появляются ошибки, 5) странно работают мышь/клавиатура, 6) что-то другое?`,
        fi:`Selvä — ${s} käyttäytyy oudosti. “Glitching” voi tarkoittaa eri asioita. Mikä sopii parhaiten: 1) näyttö/grafiikka vilkkuu, 2) ohjelmat jumittuvat tai sulkeutuvat, 3) Windows on hidas, 4) virheilmoituksia tulee, 5) hiiri/näppäimistö toimii oudosti vai 6) jotain muuta?`
      };
      V.lastIntent="glitch_details";
      return {type:"answer",text:q[V.lang(l)]};
    }

    let r=V.matchConcept(text,l);
    if(r) return {type:"answer",text:r};

    r=V.matchList(text,l,V.office);
    if(r) return {type:"answer",text:r};

    r=V.matchList(text,l,V.software);
    if(r) return {type:"answer",text:r};

    r=V.matchList(text,l,V.security);
    if(r) return {type:"answer",text:r};

    r=V.matchList(text,l,V.moreKnowledge,"pats");
    if(r) return {type:"answer",text:r};

    // Casual "I have this hassle with..." should not itself trigger fallback.
    // If we see an IT object but no symptom, ask a targeted navigation question.
    const t=V.expandSlang(text);
    const objects = [
      ["laptop","computer","pc","windows","word","excel","powerpoint","outlook","office","internet","printer","bluetooth","usb","monitor","screen","sound","microphone","camera"],
      ["ноут","комп","пк","windows","word","excel","powerpoint","outlook","office","интернет","принтер","bluetooth","usb","монитор","экран","звук","микрофон","камера"],
      ["läppäri","kone","tietokone","windows","word","excel","powerpoint","outlook","office","netti","tulostin","bluetooth","usb","näyttö","ääni","mikrofoni","kamera"]
    ];
    const objList = objects[V.lang(l)==="ru"?1:V.lang(l)==="fi"?2:0];
    const found = objList.find(o=>t.includes(o));
    // Remember the topic so short follow-ups like "it's glitching" refer to it.
    if(found) V.lastSubject=found;

    // Vague but clearly IT-related messages should trigger a navigation question.
    // Examples: "I have this problem with my Windows", "hey, trouble with my laptop".
    if(found && (/\b(problem|kind of|help|confused|something|not sure|trouble|having)\b/i.test(t)
      || /\b(i have|i've got|got a|having a|issue with|problem with)\b/i.test(t))){
      V.lastIntent="needs_details";
      const q={
        en:`Got it — the issue is around ${found}. What exactly happens when you try to use it: does it not open/turn on, show an error, run slowly, disconnect, or do something else?`,
        ru:`Поняла — проблема связана с ${found}. Что именно происходит: не открывается/не включается, появляется ошибка, всё работает медленно, отключается или что-то другое?`,
        fi:`Selvä — ongelma liittyy kohteeseen ${found}. Mitä tarkalleen tapahtuu: eikö se avaudu/käynnisty, näkyykö virhe, onko se hidas, katkeaako yhteys vai jotain muuta?`
      };
      return {type:"answer",text:q[V.lang(l)]};
    }

    return null;
  };

  V.fallback = function(text,l){
    const e=V.detectEmotion(text), lang=V.lang(l);
    if(e.angry || e.confused) return V.confusionReply(text,l);
    const f={
      en:"I’m not fully sure what you mean yet, and I’d rather ask than guess. Please tell me: 1) which device or program, 2) what you were trying to do, 3) what happened instead, and 4) any exact error text you see.",
      ru:"Я пока не до конца поняла, что вы имеете в виду, и лучше уточню, чем буду гадать. Напишите: 1) какое устройство или программа, 2) что пытались сделать, 3) что произошло вместо этого, 4) точный текст ошибки, если он есть.",
      fi:"En ole vielä täysin varma mitä tarkoitat, joten kysyn mieluummin kuin arvaan. Kerro: 1) laite tai ohjelma, 2) mitä yritit tehdä, 3) mitä tapahtui sen sijaan ja 4) tarkka virheteksti, jos sellainen näkyy."
    };
    return f[lang];
  };

  window.ANITA_V7 = V;
})();


function processMessage(q){
let l=languageMode==="auto"?detectLanguage(q):languageMode;currentLanguage=l;updateInterface(false);
if(specialistIntent(q,l)){failedAttempts=0;previousQuestion=q;previousCategory=null;excludedCategories.clear();showHuman(l);return}
if(window.ANITA_V7){
  let v7=window.ANITA_V7.handle(q,l);
  if(v7){
    failedAttempts=0;
    if(v7.type==="escalate"){
      addMessage(v7.text,"bot");
      addMessage(l==="ru"?"Похоже, здесь уже нужна более продвинутая/очная диагностика. Рекомендую связаться со специалистом:":l==="fi"?"Tämä vaikuttaa vaativan jo edistyneempää tai paikan päällä tehtävää korjausta. Suosittelen ottamaan yhteyttä IT-tukeen:":"It seems this issue requires a more advanced or hands-on fix. I recommend contacting IT support:","bot");
      showHuman(l);return
    }
    addMessage(v7.text,"bot");return
  }
}
let core=directCoreIntent(q,l);if(core){failedAttempts=0;previousQuestion=q;previousCategory=core;excludedCategories.clear();addMessage(core.a[l]||core.a.en,"bot");return}
let gc=guidedChatIntent(q,l);if(gc){failedAttempts=0;addMessage(guidedChatAnswer(gc),"bot");return}
if(window.ANITA_SMART){
  let extra=window.ANITA_SMART.lookup(q,l);
  if(extra){failedAttempts=0;previousCategory=null;excludedCategories.clear();addMessage(extra,"bot");return}
}
let si=smartMatch(q,l);if(si){failedAttempts=0;previousCategory=null;excludedCategories.clear();addMessage(smartAnswer(si,l),"bot");return}
let cf=contextualFollowup(q,l);if(cf){addMessage(cf,"bot");return}
let st=findSmallTalk(q,l);if(st){failedAttempts=0;previousCategory=null;excludedCategories.clear();addMessage(smallTalkAnswer(st,l),"bot");return}
if(isHuman(q,l)){failedAttempts=0;previousCategory=null;excludedCategories.clear();showHuman(l);return}
if(isContact(q,l)){failedAttempts=0;previousCategory=null;alexCard(l);return}
let tech=findTech(q,l);if(tech){failedAttempts=0;previousCategory=null;excludedCategories.clear();addMessage(tech.answers[l],"bot");return}
if(previousCategory&&containsPhrase(q,rejectWords[l])){excludedCategories.add(previousCategory.id);addMessage(UI[l].wrong,"bot");let r=findBest(previousQuestion+" "+q,l);if(r.item&&r.score>=4){previousCategory=r.item;addMessage(r.item.a[l],"bot")}else previousCategory=null;return}
if(previousCategory&&containsPhrase(q,failWords[l])){failedAttempts++;if(failedAttempts>=7){showEscalation(l);failedAttempts=0;previousCategory=null;excludedCategories.clear();return}addMessage(UI[l].retry(failedAttempts+1),"bot");return}
excludedCategories.clear();let r=findBest(q,l);previousQuestion=q;failedAttempts=0;if(!r.item||r.score<3.5){
  previousCategory=null;
  if(window.ANITA_V7){addMessage(window.ANITA_V7.fallback(q,l),"bot");return}
  if(window.ANITA_SMART){addMessage(window.ANITA_SMART.fallback(q,l),"bot");return}
  addMessage(UI[l].unknown,"bot");return
}previousCategory=r.item;addMessage(r.item.a[l],"bot");if(r.score<6||r.difference<1){let name=r.item.p[l][0];addMessage(l==="ru"?`Я правильно понимаю, что вопрос относится к теме «${name}»? Если нет, напишите: «Нет, я не это имел в виду».`:l==="fi"?`Ymmärsinkö oikein, että kysymys liittyy aiheeseen “${name}”? Jos ei, kirjoita: “Ei, en tarkoittanut sitä.”`:`Am I right that your question is related to “${name}”? If not, write: “No, that's not what I meant.”`,"bot")}
}

function updateInterface(g=true){let l=languageMode==="auto"?currentLanguage:languageMode,u=UI[l];input.placeholder=u.placeholder;send.textContent=u.send;online.textContent=u.online;footer.textContent=u.footer;suggestions.innerHTML="";u.chips.forEach(t=>{let b=document.createElement("button");b.className="chip";b.type="button";b.textContent=t;b.onclick=()=>{input.value=t;form.requestSubmit()};suggestions.appendChild(b)});document.querySelectorAll(".langBtn").forEach(b=>b.classList.toggle("active",b.dataset.lang===languageMode));if(g)addMessage(u.hello,"bot")}
document.querySelectorAll(".langBtn").forEach(b=>b.addEventListener("click",()=>{languageMode=b.dataset.lang;if(languageMode!=="auto")currentLanguage=languageMode;previousCategory=null;failedAttempts=0;excludedCategories.clear();updateInterface(true)}));
form.addEventListener("submit",e=>{e.preventDefault();let q=input.value.trim();if(!q)return;currentLanguage=languageMode==="auto"?detectLanguage(q):languageMode;addMessage(q,"user");input.value="";setTimeout(()=>processMessage(q),250)});
addMessage(`Здравствуйте! Я ANITA — виртуальный IT-помощник Alex Node IT Assistance.

Hello! I'm ANITA — the virtual IT assistant from Alex Node IT Assistance.

Hei! Olen ANITA — Alex Node IT Assistancen virtuaalinen IT-avustaja.

Выберите язык / Choose a language / Valitse kieli

или просто начните писать — я попробую определить язык автоматически.`,"bot");
updateInterface(false);

/* =========================================================
   ANITA SMARTER SUPPORT LAYER v6
   Deterministic, non-AI support intelligence
   Adds:
   - slang + normalization
   - typo tolerance helpers
   - richer IT glossary
   - diagnostic flows
   - contextual follow-up handling
   - many everyday home-IT support intents
   ========================================================= */

(function(){
  const ANITA_SMART = window.ANITA_SMART || {};

  ANITA_SMART.aliases = {
    pc:["pc","computer","desktop","machine","rig","comp","комп","компик","компьютер","пк","kone","tietokone"],
    laptop:["laptop","notebook","lappy","ноут","ноутбук","läppäri","kannettava"],
    internet:["internet","net","wifi","wi-fi","wlan","интернет","инет","вайфай","сеть","netti","verkko"],
    slow:["slow","sluggish","laggy","lags","lagging","freezing","stutters","тормозит","тупит","лагает","медленно","hidas","lagaa","jumittaa"],
    broken:["broken","dead","died","stopped working","doesnt work","doesn't work","not working","не работает","сломался","умер","перестал работать","ei toimi","rikki"],
    screen:["screen","monitor","display","экран","монитор","näyttö"],
    sound:["sound","audio","speaker","speakers","headphones","звук","аудио","динамики","наушники","ääni","kaiutin","kuulokkeet"],
    printer:["printer","print","печать","принтер","tulostin"],
    bluetooth:["bluetooth","bt","блютуз","sinuhammas"],
    update:["update","windows update","обновление","обновления","päivitys","windows päivitys"],
    password:["password","passcode","pin","пароль","пин","salasana","pin-koodi"],
    usb:["usb","flash drive","flashdrive","pendrive","memory stick","флешка","usb tikku","muistitikku"]
  };

  ANITA_SMART.glossary = {
    cpu:{
      en:"CPU is the main processor of the computer. It executes instructions and affects overall performance.",
      ru:"CPU — центральный процессор компьютера. Он выполняет инструкции и сильно влияет на общую производительность.",
      fi:"CPU on tietokoneen keskusprosessori. Se suorittaa käskyjä ja vaikuttaa yleiseen suorituskykyyn."
    },
    ram:{
      en:"RAM is short-term working memory. Too little RAM can make the computer slow when many programs are open.",
      ru:"RAM — оперативная память. Если её мало, компьютер может тормозить при большом количестве открытых программ.",
      fi:"RAM on työmuisti. Liian pieni määrä RAM-muistia voi hidastaa tietokonetta, kun ohjelmia on paljon auki."
    },
    ssd:{
      en:"An SSD is a fast storage drive. Replacing an old HDD with an SSD is one of the biggest speed upgrades for an older PC.",
      ru:"SSD — быстрый накопитель. Замена старого HDD на SSD часто даёт очень заметное ускорение старого компьютера.",
      fi:"SSD on nopea tallennusasema. Vanhan HDD-levyn vaihtaminen SSD:hen on yksi tehokkaimmista tavoista nopeuttaa vanhaa tietokonetta."
    },
    gpu:{
      en:"GPU is the graphics processor. It renders games, video and visual effects. Some PCs use integrated graphics inside the CPU.",
      ru:"GPU — графический процессор. Он отвечает за игры, видео и графику. В некоторых компьютерах используется встроенная графика процессора.",
      fi:"GPU on näytönohjainprosessori. Se käsittelee pelejä, videota ja grafiikkaa. Joissain tietokoneissa käytetään prosessoriin integroitua grafiikkaa."
    },
    psu:{
      en:"PSU is the power supply unit. It converts wall power and supplies the PC components with the voltages they need.",
      ru:"PSU — блок питания. Он преобразует питание из розетки и подаёт нужное напряжение компонентам ПК.",
      fi:"PSU on virtalähde. Se muuntaa verkkovirran ja syöttää tietokoneen komponenteille tarvittavat jännitteet."
    },
    hdmi:{
      en:"HDMI is a cable and port standard for digital video and audio between computers, monitors and TVs.",
      ru:"HDMI — стандарт кабеля и разъёма для передачи цифрового изображения и звука между компьютером, монитором и телевизором.",
      fi:"HDMI on digitaalisen kuvan ja äänen siirtämiseen käytetty kaapeli- ja liitäntästandardi."
    }
  };

  ANITA_SMART.knowledge = [
    {
      id:"bluetooth_not_working",
      keys:["bluetooth not working","bluetooth doesnt work","bluetooth doesn't work","bluetooth missing","cant find bluetooth","can't find bluetooth","блютуз не работает","bluetooth не работает","не вижу bluetooth","bluetooth ei toimi","bluetooth puuttuu"],
      answer:{
        en:"Try this:\n1. Turn Bluetooth off and back on.\n2. Restart the PC.\n3. Open Settings → Bluetooth & devices and confirm Bluetooth is enabled.\n4. Open Device Manager and look for Bluetooth or warning icons.\n5. If the adapter is missing, install the laptop/PC manufacturer's Bluetooth driver.\n6. Remove the device and pair it again.\nIf Bluetooth disappeared after an update, tell me your Windows version and device model.",
        ru:"Попробуйте так:\n1. Выключите и снова включите Bluetooth.\n2. Перезагрузите компьютер.\n3. Откройте Параметры → Bluetooth и устройства и убедитесь, что Bluetooth включён.\n4. Откройте Диспетчер устройств и проверьте раздел Bluetooth и значки ошибок.\n5. Если адаптер пропал, установите Bluetooth-драйвер с сайта производителя ноутбука/ПК.\n6. Удалите устройство из списка и подключите заново.\nЕсли Bluetooth исчез после обновления, напишите версию Windows и модель устройства.",
        fi:"Kokeile näin:\n1. Kytke Bluetooth pois ja takaisin päälle.\n2. Käynnistä tietokone uudelleen.\n3. Avaa Asetukset → Bluetooth ja laitteet ja varmista, että Bluetooth on käytössä.\n4. Tarkista Laitehallinnasta Bluetooth ja mahdolliset varoitusmerkit.\n5. Jos sovitin puuttuu, asenna valmistajan Bluetooth-ajuri.\n6. Poista laite ja parita se uudelleen.\nJos Bluetooth katosi päivityksen jälkeen, kerro Windows-versio ja laitteen malli."
      }
    },
    {
      id:"windows_update_problem",
      keys:["windows update not working","windows update stuck","update stuck","update failed","обновление windows не работает","windows update завис","ошибка обновления","windows update ei toimi","päivitys jumissa"],
      answer:{
        en:"For Windows Update problems:\n1. Restart the PC first.\n2. Check internet connection and free disk space.\n3. Open Settings → Windows Update and press Check for updates.\n4. If it is stuck, run Settings → System → Troubleshoot → Other troubleshooters → Windows Update.\n5. Restart again and retry.\n6. If you see an error code, send me the exact code — that helps identify the cause.",
        ru:"При проблемах с Windows Update:\n1. Сначала перезагрузите ПК.\n2. Проверьте интернет и свободное место на диске.\n3. Откройте Параметры → Центр обновления Windows → Проверить наличие обновлений.\n4. Если всё зависло, запустите средство устранения неполадок Windows Update.\n5. Снова перезагрузите компьютер и повторите попытку.\n6. Если есть код ошибки, пришлите его полностью — по нему легче понять причину.",
        fi:"Windows Updaten ongelmissa:\n1. Käynnistä tietokone uudelleen.\n2. Tarkista internet-yhteys ja vapaa levytila.\n3. Avaa Asetukset → Windows Update → Tarkista päivitykset.\n4. Jos päivitys jumittuu, suorita Windows Updaten vianmääritys.\n5. Käynnistä tietokone uudelleen ja yritä uudestaan.\n6. Jos näkyy virhekoodi, lähetä tarkka koodi."
      }
    },
    {
      id:"browser_slow",
      keys:["browser slow","chrome slow","edge slow","firefox slow","браузер тормозит","хром тормозит","edge тормозит","selain hidas","chrome hidas"],
      answer:{
        en:"If only the browser is slow:\n1. Close unnecessary tabs.\n2. Disable extensions you do not need.\n3. Clear cached files.\n4. Update the browser.\n5. Check Task Manager for high CPU/RAM usage.\n6. Try another browser. If all browsers are slow, the issue may be internet, RAM, CPU or storage instead.",
        ru:"Если тормозит только браузер:\n1. Закройте лишние вкладки.\n2. Отключите ненужные расширения.\n3. Очистите кэш.\n4. Обновите браузер.\n5. Проверьте Диспетчер задач — нет ли высокой загрузки CPU/RAM.\n6. Попробуйте другой браузер. Если тормозят все браузеры, причина может быть в интернете, RAM, процессоре или диске.",
        fi:"Jos vain selain on hidas:\n1. Sulje turhat välilehdet.\n2. Poista tarpeettomat laajennukset käytöstä.\n3. Tyhjennä välimuisti.\n4. Päivitä selain.\n5. Tarkista Tehtävienhallinnasta CPU- ja RAM-käyttö.\n6. Kokeile toista selainta. Jos kaikki selaimet ovat hitaita, syy voi olla verkossa, muistissa, prosessorissa tai levyllä."
      }
    },
    {
      id:"storage_full",
      keys:["disk full","storage full","c drive full","no space","low disk space","диск заполнен","нет места на диске","диск c заполнен","levy täynnä","tila loppu"],
      answer:{
        en:"If the system drive is full:\n1. Open Settings → System → Storage.\n2. Check which categories use the most space.\n3. Empty Recycle Bin and Downloads if safe.\n4. Remove unused apps.\n5. Run Temporary files cleanup.\n6. Move large videos/photos to another drive or cloud storage.\nAvoid deleting unknown Windows folders manually.",
        ru:"Если системный диск заполнен:\n1. Откройте Параметры → Система → Память.\n2. Посмотрите, что занимает больше всего места.\n3. Очистите Корзину и Загрузки, если файлы не нужны.\n4. Удалите ненужные программы.\n5. Очистите временные файлы.\n6. Перенесите большие видео/фото на другой диск или в облако.\nНе удаляйте неизвестные папки Windows вручную.",
        fi:"Jos järjestelmälevy on täynnä:\n1. Avaa Asetukset → Järjestelmä → Tallennustila.\n2. Tarkista, mikä vie eniten tilaa.\n3. Tyhjennä Roskakori ja Lataukset tarvittaessa.\n4. Poista tarpeettomat sovellukset.\n5. Poista väliaikaiset tiedostot.\n6. Siirrä suuret videot ja kuvat toiselle levylle tai pilveen.\nÄlä poista tuntemattomia Windows-kansioita käsin."
      }
    },
    {
      id:"usb_not_detected",
      keys:["usb not detected","usb not recognized","flash drive not showing","usb doesnt work","usb doesn't work","флешка не определяется","usb не видит","флешку не видно","usb ei tunnistu","muistitikku ei näy"],
      answer:{
        en:"For an unrecognized USB device:\n1. Try another USB port.\n2. Restart the PC.\n3. Test the device on another computer.\n4. Open Device Manager and look for warning icons under USB controllers.\n5. For a storage drive, open Disk Management and see whether the drive appears there.\n6. Do not format the drive if it contains important files you need.",
        ru:"Если USB-устройство не определяется:\n1. Попробуйте другой USB-порт.\n2. Перезагрузите компьютер.\n3. Проверьте устройство на другом компьютере.\n4. Откройте Диспетчер устройств и проверьте ошибки в USB-контроллерах.\n5. Для флешки/диска откройте Управление дисками и посмотрите, виден ли накопитель там.\n6. Не форматируйте накопитель, если на нём есть важные файлы.",
        fi:"Jos USB-laite ei tunnistu:\n1. Kokeile toista USB-porttia.\n2. Käynnistä tietokone uudelleen.\n3. Testaa laite toisessa tietokoneessa.\n4. Tarkista Laitehallinnasta USB-ohjainten varoitukset.\n5. Tallennuslaitteelle avaa Levynhallinta ja tarkista näkyykö asema siellä.\n6. Älä alusta asemaa, jos siinä on tärkeitä tiedostoja."
      }
    },
    {
      id:"overheating",
      keys:["computer overheating","pc overheating","laptop overheating","very hot laptop","fan very loud","computer hot","перегревается","ноутбук горячий","вентилятор громко","ylikuumenee","läppäri kuuma","tuuletin äänekäs"],
      answer:{
        en:"If the PC or laptop gets very hot:\n1. Shut it down if it becomes unusually hot or unstable.\n2. Make sure vents are not blocked.\n3. Use the laptop on a hard surface, not a bed or blanket.\n4. Check Task Manager for a process using very high CPU.\n5. Clean dust from vents if you know how to do it safely.\n6. Persistent overheating may require internal cleaning or thermal paste service.",
        ru:"Если ПК или ноутбук сильно греется:\n1. Выключите его, если температура необычно высокая или система нестабильна.\n2. Убедитесь, что вентиляционные отверстия не закрыты.\n3. Не используйте ноутбук на кровати или одеяле — лучше на твёрдой поверхности.\n4. Проверьте Диспетчер задач на процессы с высокой загрузкой CPU.\n5. Аккуратно очистите вентиляционные отверстия от пыли, если умеете это делать безопасно.\n6. Постоянный перегрев может потребовать внутренней чистки или обслуживания системы охлаждения.",
        fi:"Jos tietokone kuumenee paljon:\n1. Sammuta se, jos lämpötila on poikkeuksellisen korkea tai kone epävakaa.\n2. Varmista, etteivät ilmanottoaukot ole tukossa.\n3. Käytä kannettavaa kovalla alustalla, ei sängyllä tai peitolla.\n4. Tarkista Tehtävienhallinnasta korkea CPU-kuormitus.\n5. Puhdista pöly ilmanvaihtoaukoista turvallisesti.\n6. Jatkuva ylikuumeneminen voi vaatia sisäisen puhdistuksen tai jäähdytyshuollon."
      }
    },
    {
      id:"blue_screen",
      keys:["blue screen","bsod","computer blue screen","windows blue screen","синий экран","bsod ошибка","sininen ruutu","blue screen windows"],
      answer:{
        en:"A blue screen usually means Windows hit a serious system or driver error. Write down the stop code first. Then:\n1. Restart the PC.\n2. Install Windows updates.\n3. Update or roll back recently changed drivers.\n4. Disconnect newly added hardware.\n5. Check RAM and storage health if crashes continue.\nSend me the exact stop code if you have it.",
        ru:"Синий экран обычно означает серьёзную системную или драйверную ошибку Windows. Сначала запишите STOP-код. Затем:\n1. Перезагрузите ПК.\n2. Установите обновления Windows.\n3. Обновите или откатите недавно изменённые драйверы.\n4. Отключите недавно добавленное оборудование.\n5. Если сбои продолжаются, стоит проверить RAM и состояние накопителя.\nПришлите точный STOP-код, если он есть.",
        fi:"Sininen ruutu tarkoittaa yleensä vakavaa Windowsin järjestelmä- tai ajurivirhettä. Kirjaa STOP-koodi ylös. Sitten:\n1. Käynnistä tietokone uudelleen.\n2. Asenna Windows-päivitykset.\n3. Päivitä tai palauta äskettäin muutetut ajurit.\n4. Irrota uusi laitteisto.\n5. Jos kaatumiset jatkuvat, tarkista RAM ja tallennusasema.\nLähetä tarkka STOP-koodi, jos se näkyy."
      }
    },
    {
      id:"malware_suspected",
      keys:["virus","malware","computer infected","popups everywhere","browser hijacked","вирус","вредонос","компьютер заражен","везде реклама","haittaohjelma","virus koneella"],
      answer:{
        en:"If you suspect malware:\n1. Disconnect from suspicious websites and close unknown programs.\n2. Run Windows Security → Virus & threat protection → Full scan.\n3. Remove suspicious browser extensions.\n4. Uninstall programs you do not recognize.\n5. Change important passwords from a clean device if you entered them on a suspicious page.\n6. If the PC is heavily compromised, back up personal files and consider a clean Windows reinstall.",
        ru:"Если подозреваете вирус или вредоносное ПО:\n1. Закройте подозрительные сайты и неизвестные программы.\n2. Запустите Безопасность Windows → Защита от вирусов и угроз → Полная проверка.\n3. Удалите подозрительные расширения браузера.\n4. Удалите программы, которые вы не устанавливали.\n5. Если вводили пароли на подозрительном сайте, смените важные пароли с чистого устройства.\n6. При серьёзном заражении сохраните личные файлы и рассмотрите чистую переустановку Windows.",
        fi:"Jos epäilet haittaohjelmaa:\n1. Sulje epäilyttävät sivut ja tuntemattomat ohjelmat.\n2. Suorita Windowsin suojaus → Virusten ja uhkien torjunta → Täysi tarkistus.\n3. Poista epäilyttävät selainlaajennukset.\n4. Poista ohjelmat, joita et tunnista.\n5. Vaihda tärkeät salasanat puhtaalta laitteelta, jos syötit ne epäilyttävälle sivulle.\n6. Vakavassa tartunnassa varmuuskopioi omat tiedostot ja harkitse Windowsin puhdasta asennusta."
      }
    },
    {
      id:"email_not_syncing",
      keys:["email not syncing","outlook not syncing","mail not updating","email not receiving","почта не синхронизируется","outlook не получает письма","sähköposti ei synkronoidu","outlook ei synkronoidu"],
      answer:{
        en:"If email is not syncing:\n1. Check internet access.\n2. Open webmail to see whether new mail exists there.\n3. Restart the mail app.\n4. Confirm the account password is still valid.\n5. Check whether the mailbox is full.\n6. In Outlook, try Send/Receive and check Work Offline is not enabled.\nIf only one device has the issue, the account itself is probably fine.",
        ru:"Если почта не синхронизируется:\n1. Проверьте интернет.\n2. Откройте веб-почту и посмотрите, приходят ли письма там.\n3. Перезапустите почтовое приложение.\n4. Убедитесь, что пароль аккаунта актуален.\n5. Проверьте, не переполнен ли почтовый ящик.\n6. В Outlook нажмите Отправить/Получить и проверьте, что автономный режим выключен.\nЕсли проблема только на одном устройстве, сам аккаунт, скорее всего, работает.",
        fi:"Jos sähköposti ei synkronoidu:\n1. Tarkista internet-yhteys.\n2. Avaa webmail ja tarkista näkyvätkö uudet viestit siellä.\n3. Käynnistä sähköpostiohjelma uudelleen.\n4. Varmista, että salasana on voimassa.\n5. Tarkista, ettei postilaatikko ole täynnä.\n6. Outlookissa käytä Lähetä/Vastaanota-toimintoa ja varmista, ettei Offline-tila ole päällä.\nJos ongelma on vain yhdellä laitteella, itse tili todennäköisesti toimii."
      }
    },
    {
      id:"camera_not_working",
      keys:["camera not working","webcam not working","camera black","zoom camera not working","teams camera not working","камера не работает","вебкамера не работает","kamera ei toimi","webkamera ei toimi"],
      answer:{
        en:"For a webcam problem:\n1. Close other apps that may be using the camera.\n2. Check Settings → Privacy & security → Camera and allow access.\n3. In Teams/Zoom, confirm the correct camera is selected.\n4. Restart the app and PC.\n5. Check Device Manager for camera errors.\n6. For an external webcam, try another USB port.",
        ru:"Если не работает веб-камера:\n1. Закройте другие программы, которые могут использовать камеру.\n2. Откройте Параметры → Конфиденциальность и безопасность → Камера и разрешите доступ.\n3. В Teams/Zoom выберите правильную камеру.\n4. Перезапустите программу и компьютер.\n5. Проверьте камеру в Диспетчере устройств.\n6. Для внешней камеры попробуйте другой USB-порт.",
        fi:"Jos webkamera ei toimi:\n1. Sulje muut sovellukset, jotka voivat käyttää kameraa.\n2. Avaa Asetukset → Tietosuoja ja suojaus → Kamera ja salli käyttö.\n3. Varmista Teamsissa/Zoomissa oikea kamera.\n4. Käynnistä sovellus ja tietokone uudelleen.\n5. Tarkista kamera Laitehallinnasta.\n6. Ulkoiselle kameralle kokeile toista USB-porttia."
      }
    },
    {
      id:"mic_not_working",
      keys:["microphone not working","mic not working","teams mic not working","zoom mic not working","микрофон не работает","микрофон не слышно","mikrofoni ei toimi"],
      answer:{
        en:"For microphone problems:\n1. Check the physical mute switch/button.\n2. Open Settings → System → Sound → Input and choose the correct microphone.\n3. Check Privacy & security → Microphone permissions.\n4. In Teams/Zoom, select the same microphone.\n5. Test it in Windows Sound settings.\n6. For USB/headset microphones, reconnect or try another port.",
        ru:"Если не работает микрофон:\n1. Проверьте физическую кнопку Mute.\n2. Откройте Параметры → Система → Звук → Ввод и выберите правильный микрофон.\n3. Проверьте разрешения микрофона в разделе Конфиденциальность.\n4. В Teams/Zoom выберите тот же микрофон.\n5. Проверьте микрофон в настройках звука Windows.\n6. Для USB/гарнитуры переподключите устройство или попробуйте другой порт.",
        fi:"Jos mikrofoni ei toimi:\n1. Tarkista fyysinen mykistyskytkin.\n2. Avaa Asetukset → Järjestelmä → Ääni → Syöttö ja valitse oikea mikrofoni.\n3. Tarkista mikrofonin käyttöoikeudet.\n4. Valitse sama mikrofoni Teamsissa/Zoomissa.\n5. Testaa se Windowsin ääniasetuksissa.\n6. USB-mikrofonille tai kuulokemikrofonille kokeile uudelleenkytkentää tai toista porttia."
      }
    }
  ];

  ANITA_SMART.flows = {
    pc_no_power:{
      start:{
        q:{
          en:"When you press the power button, what happens?",
          ru:"Что происходит, когда вы нажимаете кнопку питания?",
          fi:"Mitä tapahtuu, kun painat virtapainiketta?"
        },
        choices:{
          nothing:"power_nothing",
          fans:"power_fans",
          lights:"power_lights"
        }
      },
      power_nothing:{
        q:{
          en:"Is the power cable firmly connected and does the wall socket work?",
          ru:"Кабель питания плотно подключён и розетка точно работает?",
          fi:"Onko virtajohto kunnolla kiinni ja toimiiko pistorasia varmasti?"
        },
        choices:{yes:"power_switch",no:"power_connect"}
      },
      power_switch:{
        a:{
          en:"Check the power switch on the back of a desktop PC power supply, if present. If there is still absolutely no response, the problem may be the PSU, power button, charger, battery or motherboard. Avoid opening the power supply itself.",
          ru:"Проверьте выключатель на задней части блока питания настольного ПК, если он есть. Если реакции всё ещё нет, проблема может быть в БП, кнопке питания, зарядном устройстве, аккумуляторе или материнской плате. Сам блок питания не вскрывайте.",
          fi:"Tarkista pöytäkoneen virtalähteen takakytkin, jos sellainen on. Jos mitään ei tapahdu, vika voi olla virtalähteessä, virtapainikkeessa, laturissa, akussa tai emolevyssä. Älä avaa virtalähdettä itse."
        }
      },
      power_connect:{
        a:{
          en:"Reconnect the power cable firmly, test another wall socket and try again. For a laptop, also check whether the charging indicator turns on.",
          ru:"Подключите кабель питания заново, попробуйте другую розетку и включите ещё раз. На ноутбуке также проверьте, появляется ли индикатор зарядки.",
          fi:"Kytke virtajohto uudelleen kunnolla, kokeile toista pistorasiaa ja yritä uudestaan. Kannettavassa tarkista myös syttyykö latausvalo."
        }
      },
      power_fans:{
        q:{
          en:"Do you get any image on the monitor?",
          ru:"Появляется ли изображение на мониторе?",
          fi:"Näkyykö näytöllä kuvaa?"
        },
        choices:{yes:"boot_followup",no:"display_followup"}
      },
      power_lights:{
        q:{
          en:"Do you hear fans or Windows startup sounds?",
          ru:"Слышно вентиляторы или звуки загрузки Windows?",
          fi:"Kuuluvatko tuulettimet tai Windowsin käynnistysäänet?"
        },
        choices:{yes:"display_followup",no:"power_switch"}
      },
      display_followup:{
        a:{
          en:"The PC may be running but not producing video. Check monitor power, HDMI/DisplayPort cable, the monitor input source and try another cable or screen.",
          ru:"ПК может работать, но не выводить изображение. Проверьте питание монитора, HDMI/DisplayPort, выбранный вход монитора и попробуйте другой кабель или экран.",
          fi:"Tietokone voi olla käynnissä ilman kuvaa. Tarkista näytön virta, HDMI/DisplayPort-kaapeli, oikea tulolähde ja kokeile toista kaapelia tai näyttöä."
        }
      },
      boot_followup:{
        a:{
          en:"If you see an image, tell me exactly where startup stops: manufacturer logo, spinning dots, login screen, error message, or Windows desktop.",
          ru:"Если изображение есть, напишите, где именно останавливается загрузка: логотип производителя, крутящиеся точки, экран входа, ошибка или рабочий стол Windows.",
          fi:"Jos kuva näkyy, kerro missä käynnistys pysähtyy: valmistajan logo, pyörivät pisteet, kirjautumisruutu, virheilmoitus vai Windowsin työpöytä."
        }
      }
    }
  };

  ANITA_SMART.detectLanguage = function(text){
    const t=(text||"").toLowerCase();
    if(/[а-яё]/i.test(t)) return "ru";
    if(/[äöå]/i.test(t) || /\b(miksi|miten|kone|läppäri|tietokone|näyttö|ääni|verkko|ei toimi|hidas)\b/.test(t)) return "fi";
    return "en";
  };

  ANITA_SMART.normalize = function(text){
    let t=(text||"").toLowerCase()
      .replace(/[’`]/g,"'")
      .replace(/[^\p{L}\p{N}\s'+.-]/gu," ")
      .replace(/\s+/g," ")
      .trim();
    Object.entries(ANITA_SMART.aliases).forEach(([canon, arr])=>{
      arr.sort((a,b)=>b.length-a.length).forEach(a=>{
        const safe=a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
        t=t.replace(new RegExp("(^|\\s)"+safe+"(?=\\s|$)","gi"),"$1"+canon);
      });
    });
    return t;
  };

  ANITA_SMART.distance = function(a,b){
    a=(a||""); b=(b||"");
    const m=Array.from({length:a.length+1},()=>Array(b.length+1).fill(0));
    for(let i=0;i<=a.length;i++)m[i][0]=i;
    for(let j=0;j<=b.length;j++)m[0][j]=j;
    for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)
      m[i][j]=Math.min(m[i-1][j]+1,m[i][j-1]+1,m[i-1][j-1]+(a[i-1]===b[j-1]?0:1));
    return m[a.length][b.length];
  };

  ANITA_SMART.fuzzyIncludes = function(text, phrase){
    const t=ANITA_SMART.normalize(text), p=ANITA_SMART.normalize(phrase);
    if(t.includes(p)) return true;
    if(p.length<5) return false;
    const words=t.split(/\s+/), pw=p.split(/\s+/);
    if(pw.length===1){
      return words.some(w=>Math.abs(w.length-p.length)<=2 && ANITA_SMART.distance(w,p)<=2);
    }
    return false;
  };

  ANITA_SMART.lookup = function(text,lang){
    for(const item of ANITA_SMART.knowledge){
      if(item.keys.some(k=>ANITA_SMART.fuzzyIncludes(text,k))){
        return item.answer[lang] || item.answer.en;
      }
    }
    const n=ANITA_SMART.normalize(text);
    for(const [term,obj] of Object.entries(ANITA_SMART.glossary)){
      if(new RegExp("\\b"+term+"\\b","i").test(n) && /\b(what is|whats|what's|что такое|что значит|mikä on|mitä tarkoittaa)\b/i.test(text)){
        return obj[lang] || obj.en;
      }
    }
    return null;
  };

  ANITA_SMART.fallback = function(text,lang){
    const base={
      en:"I can help with everyday computer, Windows, software, Wi-Fi, browser, printer, audio, monitor, USB and hardware questions. Tell me what device you use, what you expected to happen, and what happens instead.",
      ru:"Я могу помочь с обычными проблемами компьютера, Windows, программ, Wi-Fi, браузера, принтера, звука, монитора, USB и железа. Напишите, какое у вас устройство, что должно было произойти и что происходит вместо этого.",
      fi:"Voin auttaa tavallisissa tietokone-, Windows-, ohjelmisto-, Wi-Fi-, selain-, tulostin-, ääni-, näyttö-, USB- ja laitteisto-ongelmissa. Kerro mikä laite on kyseessä, mitä piti tapahtua ja mitä tapahtuu sen sijaan."
    };
    return base[lang]||base.en;
  };

  window.ANITA_SMART = ANITA_SMART;
})();


(function(){
"use strict";
const DB=[{"id":"isp","a":["isp","internet service provider","internet provider"],"en":"ISP means Internet Service Provider — the company that provides your Internet connection. If every device loses Internet together while Wi‑Fi still exists, check the router/WAN connection and your ISP outage status.","ru":"ISP — это интернет‑провайдер, компания, которая предоставляет подключение к интернету. Если интернет одновременно пропал на всех устройствах, проверь роутер/WAN и возможный сбой у провайдера.","fi":"ISP tarkoittaa internet-palveluntarjoajaa. Jos internet katoaa kaikilta laitteilta yhtä aikaa, tarkista reititin/WAN-yhteys ja palveluntarjoajan häiriötilanne."},{"id":"dns","a":["dns","domain name system","dns server"],"en":"DNS (Domain Name System) is the Internet's address book: it translates names such as example.com into IP addresses. If DNS fails, Wi‑Fi may be connected while websites do not open by name. On Windows you can try ipconfig /flushdns and test another DNS resolver.","ru":"DNS — система доменных имён, «адресная книга интернета»: она переводит example.com в IP‑адрес. При сбое DNS Wi‑Fi может быть подключён, но сайты по имени не открываются. В Windows можно попробовать ipconfig /flushdns и другой DNS.","fi":"DNS on internetin osoitekirja: se muuntaa nimet kuten example.com IP-osoitteiksi. DNS-ongelmassa Wi‑Fi voi toimia mutta sivut eivät avaudu nimellä."},{"id":"dhcp","a":["dhcp","dynamic host configuration protocol"],"en":"DHCP automatically gives devices IP settings such as IP address, gateway and DNS. A home router normally provides DHCP. A 169.254.x.x address can indicate DHCP failure.","ru":"DHCP автоматически выдаёт устройствам IP‑адрес, шлюз и DNS. Дома DHCP обычно предоставляет роутер. Адрес 169.254.x.x может указывать на проблему DHCP.","fi":"DHCP antaa laitteille automaattisesti IP-osoitteen, yhdyskäytävän ja DNS-asetukset. Kotona reititin toimii yleensä DHCP-palvelimena."},{"id":"ip","a":["ip","ip address","ipv4","ipv6"],"en":"An IP address identifies a network interface on an IP network. Private addresses such as 192.168.x.x are used inside home networks; a public IP represents the Internet connection externally.","ru":"IP‑адрес идентифицирует сетевой интерфейс. Частные адреса вроде 192.168.x.x используются внутри домашней сети, публичный IP виден во внешнем интернете.","fi":"IP-osoite tunnistaa verkkoliitännän. Yksityisiä osoitteita kuten 192.168.x.x käytetään kotiverkossa; julkinen IP näkyy internetiin."},{"id":"gateway","a":["gateway","default gateway"],"en":"The default gateway is normally your router's local IP address. Your PC sends traffic there when it needs to reach outside the local network.","ru":"Шлюз по умолчанию — обычно локальный IP роутера. Через него компьютер отправляет трафик за пределы локальной сети.","fi":"Oletusyhdyskäytävä on yleensä reitittimen paikallinen IP-osoite, jonka kautta liikenne lähtee lähiverkon ulkopuolelle."},{"id":"router","a":["router"],"en":"A router connects your local network to other networks, usually the Internet. Home routers commonly provide Wi‑Fi, Ethernet, DHCP, NAT and firewall functions.","ru":"Роутер соединяет локальную сеть с интернетом и часто одновременно предоставляет Wi‑Fi, Ethernet, DHCP, NAT и брандмауэр.","fi":"Reititin yhdistää lähiverkon internetiin ja tarjoaa usein Wi‑Fi-, Ethernet-, DHCP-, NAT- ja palomuuritoimintoja."},{"id":"modem","a":["modem"],"en":"A modem connects your premises to the access technology used by the ISP; a router manages the local network. Many home devices combine both functions.","ru":"Модем связывает помещение с линией провайдера, а роутер управляет локальной сетью. Часто обе функции объединены в одном устройстве.","fi":"Modeemi muodostaa yhteyden palveluntarjoajan liittymään ja reititin hallitsee lähiverkkoa. Usein toiminnot ovat samassa laitteessa."},{"id":"wifi","a":["wifi","wi fi","wlan","wireless"],"en":"Wi‑Fi is the wireless link between your device and a router/access point; it is not the same as the Internet. You can have Wi‑Fi without Internet access.","ru":"Wi‑Fi — беспроводная связь устройства с роутером/точкой доступа; это не сам интернет. Wi‑Fi может работать даже без доступа в интернет.","fi":"Wi‑Fi on langaton yhteys laitteen ja reitittimen/tukiaseman välillä; se ei ole sama asia kuin internet."},{"id":"ethernet","a":["ethernet","lan cable","network cable","rj45"],"en":"Ethernet is a wired network connection, commonly using an RJ45 cable. It is usually more stable and lower-latency than Wi‑Fi.","ru":"Ethernet — проводное сетевое подключение, обычно через RJ45. Оно обычно стабильнее Wi‑Fi и имеет меньшую задержку.","fi":"Ethernet on langallinen verkkoyhteys, yleensä RJ45-kaapelilla. Se on tavallisesti Wi‑Fiä vakaampi."},{"id":"vpn","a":["vpn","virtual private network"],"en":"A VPN creates an encrypted tunnel between your device and a VPN server. It can improve privacy on untrusted networks but can also reduce speed or break some services.","ru":"VPN создаёт зашифрованный туннель между устройством и VPN‑сервером. Он может повысить приватность, но иногда снижает скорость или мешает сервисам.","fi":"VPN luo salatun tunnelin laitteen ja VPN-palvelimen välille. Se voi parantaa yksityisyyttä mutta myös hidastaa yhteyttä."},{"id":"ping","a":["ping"],"en":"Ping measures whether a network host responds and roughly how long the round trip takes, usually in milliseconds. High latency or packet loss can cause lag.","ru":"Ping показывает, отвечает ли сетевой узел и примерную задержку туда‑обратно в миллисекундах. Высокий ping или потеря пакетов вызывают лаги.","fi":"Ping mittaa vastaako verkkolaite ja kuinka pitkä edestakainen viive on millisekunteina."},{"id":"cpu","a":["cpu","processor"],"en":"CPU is the main general-purpose processor. Persistent 100% usage while idle can indicate a heavy background process, update, faulty app or malware; Task Manager shows the process.","ru":"CPU — центральный процессор. Постоянные 100% в простое могут означать тяжёлый фоновый процесс, обновление, проблемную программу или malware; процесс видно в Диспетчере задач.","fi":"CPU on tietokoneen yleissuoritin. Jatkuva 100 % käyttö tyhjäkäynnillä voi johtua taustaprosessista, päivityksestä tai ongelmallisesta ohjelmasta."},{"id":"ram","a":["ram","memory","system memory"],"en":"RAM is fast working memory used by Windows and running apps. When RAM is full, the PC can become slow because Windows relies more on slower virtual memory.","ru":"RAM — быстрая оперативная память. Когда она заполнена, ПК может тормозить, потому что Windows активнее использует более медленную виртуальную память.","fi":"RAM on nopeaa työmuistia. Kun se täyttyy, Windows joutuu käyttämään hitaampaa virtuaalimuistia ja kone voi hidastua."},{"id":"gpu","a":["gpu","graphics card","video card"],"en":"GPU is the graphics processor used for rendering graphics, games, video and some compute tasks. Dedicated GPUs normally have their own VRAM.","ru":"GPU — графический процессор для графики, игр, видео и некоторых вычислений. У дискретных GPU обычно есть собственная VRAM.","fi":"GPU on grafiikkasuoritin peleille, grafiikalle, videolle ja joillekin laskentatehtäville. Erillisellä GPU:lla on yleensä oma VRAM."},{"id":"ssd","a":["ssd","solid state drive","nvme"],"en":"An SSD is solid-state storage with no moving parts. It is much faster for normal PC use than a mechanical HDD. NVMe SSDs commonly use PCIe; SATA SSDs use SATA.","ru":"SSD — твердотельный накопитель без движущихся частей. Он намного быстрее HDD. NVMe SSD обычно использует PCIe, SATA SSD — SATA.","fi":"SSD on puolijohdetallennus ilman liikkuvia osia. Se on HDD:tä paljon nopeampi. NVMe käyttää yleensä PCIe:tä, SATA-SSD SATAa."},{"id":"hdd","a":["hdd","hard drive","hard disk"],"en":"An HDD is a mechanical hard disk. It is inexpensive for large storage but slower and more shock-sensitive than an SSD. Clicking or repeated read errors can indicate failure.","ru":"HDD — механический жёсткий диск. Он дешевле для больших объёмов, но медленнее и чувствительнее SSD. Щелчки и ошибки чтения могут означать неисправность.","fi":"HDD on mekaaninen kiintolevy. Se on edullinen suureen tilaan mutta SSD:tä hitaampi ja herkempi iskuille."},{"id":"bios","a":["bios","uefi"],"en":"BIOS/UEFI is motherboard firmware that initializes hardware and starts the OS boot process. Modern PCs normally use UEFI. Avoid changing unfamiliar settings randomly.","ru":"BIOS/UEFI — прошивка материнской платы, инициализирующая оборудование и загрузку ОС. Современные ПК обычно используют UEFI. Не меняй незнакомые параметры наугад.","fi":"BIOS/UEFI on emolevyn laiteohjelmisto, joka alustaa laitteiston ja käynnistää käyttöjärjestelmän latauksen."},{"id":"driver","a":["driver","drivers","device driver"],"en":"A driver lets Windows communicate with hardware such as a GPU, Wi‑Fi adapter, printer or audio device. Prefer Windows Update or the manufacturer's official support page.","ru":"Драйвер позволяет Windows работать с оборудованием: GPU, Wi‑Fi, принтером, звуком и т. д. Лучше использовать Windows Update или официальный сайт производителя.","fi":"Ajuri mahdollistaa Windowsin kommunikoinnin laitteiston kanssa. Käytä mieluiten Windows Updatea tai valmistajan virallista tukisivua."},{"id":"task manager","a":["task manager","taskmanager"],"en":"Task Manager shows running processes and CPU, memory, disk, network and GPU usage. Open it with Ctrl+Shift+Esc.","ru":"Диспетчер задач показывает процессы и загрузку CPU, памяти, диска, сети и GPU. Открывается Ctrl+Shift+Esc.","fi":"Tehtävienhallinta näyttää prosessit sekä CPU-, muisti-, levy-, verkko- ja GPU-käytön. Avaa Ctrl+Shift+Esc."},{"id":"safe mode","a":["safe mode","windows safe mode"],"en":"Safe Mode starts Windows with a minimal set of drivers/services to help diagnose startup, driver and third-party software problems.","ru":"Безопасный режим запускает Windows с минимальным набором драйверов/служб и помогает диагностировать проблемы запуска, драйверов и стороннего ПО.","fi":"Vikasietotila käynnistää Windowsin vähäisillä ajureilla/palveluilla ja auttaa diagnosoimaan ongelmia."},{"id":"restore point","a":["restore point","system restore"],"en":"System Restore can roll Windows system settings/files back to an earlier restore point. It is not a replacement for a personal-file backup.","ru":"Восстановление системы может откатить системные настройки/файлы Windows к точке восстановления. Это не замена backup личных файлов.","fi":"Järjestelmän palautus voi palauttaa Windowsin järjestelmäasetuksia aiempaan palautuspisteeseen. Se ei korvaa tiedostojen varmuuskopiota."},{"id":"windows update","a":["windows update","windows updates"],"en":"Windows Update installs security fixes, OS updates and many drivers. Windows 11: Settings → Windows Update → Check for updates.","ru":"Windows Update устанавливает исправления безопасности, обновления ОС и многие драйверы. Windows 11: Параметры → Центр обновления Windows.","fi":"Windows Update asentaa tietoturvakorjauksia, käyttöjärjestelmäpäivityksiä ja monia ajureita."},{"id":"bitlocker","a":["bitlocker"],"en":"BitLocker/device encryption protects drive data with encryption. If asked for a recovery key, do not format the drive; locate the recovery key in the Microsoft/organization account or saved copy.","ru":"BitLocker шифрует данные диска. Если запрошен recovery key, не форматируй диск; найди ключ в аккаунте Microsoft/организации или сохранённой копии.","fi":"BitLocker salaa aseman tiedot. Jos palautusavainta pyydetään, älä alusta levyä vaan etsi avain Microsoft-/organisaatiotililtä tai tallennetusta kopiosta."},{"id":"malware","a":["malware","virus","computer virus","trojan","spyware","ransomware"],"en":"Malware includes viruses, trojans, spyware and ransomware. For suspected infection, run Windows Security → Virus & threat protection → Full scan; for stubborn threats consider Microsoft Defender Offline. Avoid entering passwords into suspicious popups.","ru":"Malware включает вирусы, трояны, spyware и ransomware. При подозрении запусти Безопасность Windows → Защита от вирусов и угроз → Полная проверка; для сложных угроз — Microsoft Defender Offline.","fi":"Haittaohjelmia ovat virukset, troijalaiset, vakoilu- ja kiristysohjelmat. Tee Windowsin suojauksessa Täysi tarkistus; vaikeassa tapauksessa Defender Offline."},{"id":"antivirus","a":["antivirus","anti virus","windows defender","microsoft defender"],"en":"For most Windows 11 home users, built-in Microsoft Defender is a sensible baseline when Windows and browsers are updated. Avoid running multiple real-time antivirus products together.","ru":"Для большинства домашних пользователей Windows 11 встроенный Microsoft Defender — разумная базовая защита при обновлённых Windows и браузерах. Не запускай несколько realtime-антивирусов одновременно.","fi":"Useimmille Windows 11 -kotikäyttäjille Microsoft Defender on järkevä perustason suoja. Älä käytä useita reaaliaikaisia virustorjuntoja samanaikaisesti."},{"id":"firewall","a":["firewall"],"en":"A firewall controls network traffic according to rules. Windows includes Microsoft Defender Firewall; normally keep it enabled and adjust an app's permission instead of disabling the whole firewall.","ru":"Брандмауэр контролирует сетевой трафик. В Windows есть Microsoft Defender Firewall; обычно держи его включённым и меняй разрешение конкретной программы вместо полного отключения.","fi":"Palomuuri valvoo verkkoliikennettä. Windowsissa on Microsoft Defender Firewall; pidä se normaalisti käytössä."},{"id":"phishing","a":["phishing"],"en":"Phishing tries to steal passwords/payment details through deceptive messages, links or files. Do not sign in through an unexpected message link; open the real service yourself. If you entered a password, change it and enable MFA.","ru":"Фишинг пытается украсть пароли/платёжные данные через обманные сообщения, ссылки или файлы. Не входи через неожиданную ссылку; открой официальный сервис сам. Если пароль уже введён — смени его и включи MFA.","fi":"Tietojenkalastelu yrittää varastaa salasanoja tai maksutietoja. Älä kirjaudu odottamattoman viestin linkistä; avaa virallinen palvelu itse."},{"id":"mfa","a":["mfa","2fa","two factor authentication","multi factor authentication"],"en":"MFA/2FA adds another verification factor beyond the password, such as an authenticator app, security key or device prompt. It greatly reduces risk from stolen passwords.","ru":"MFA/2FA добавляет к паролю второй фактор: приложение‑аутентификатор, security key или подтверждение на устройстве. Это сильно снижает риск кражи аккаунта.","fi":"MFA/2FA lisää salasanan lisäksi toisen tunnistustavan ja vähentää varastetun salasanan riskiä."},{"id":"backup","a":["backup","back up"],"en":"A backup is a separate copy of important data for recovery after deletion, hardware failure or malware. Keep important files in more than one place; sync alone is not always a full backup.","ru":"Backup — отдельная копия важных данных для восстановления после удаления, поломки или malware. Храни важное более чем в одном месте; синхронизация не всегда полноценный backup.","fi":"Varmuuskopio on erillinen kopio tärkeistä tiedoista palautusta varten. Säilytä tärkeät tiedot useammassa paikassa."},{"id":"onedrive","a":["onedrive","one drive"],"en":"OneDrive is Microsoft's cloud storage/sync service. If sync is stuck, check Internet access, account sign-in, free local/cloud space and the OneDrive status icon before resetting it.","ru":"OneDrive — облачное хранилище/синхронизация Microsoft. Если sync завис, проверь интернет, вход в аккаунт, свободное место и статус значка OneDrive.","fi":"OneDrive on Microsoftin pilvitallennus/synkronointipalvelu. Jos synkronointi jumittuu, tarkista internet, kirjautuminen ja vapaa tila."},{"id":"microsoft 365","a":["microsoft 365","office","office 365","m365"],"en":"Microsoft 365 can include Word, Excel, PowerPoint, Outlook and cloud services depending on the plan. For a broken Office app, update Windows/Office, then try Microsoft 365 → Modify → Quick Repair.","ru":"Microsoft 365 может включать Word, Excel, PowerPoint, Outlook и облачные сервисы. Если Office сломан, обнови Windows/Office и попробуй Microsoft 365 → Изменить → Быстрое восстановление.","fi":"Microsoft 365 voi sisältää Wordin, Excelin, PowerPointin, Outlookin ja pilvipalveluita. Ongelmatilanteessa kokeile päivityksiä ja Quick Repair -korjausta."},{"id":"word","a":["word","microsoft word","ms word"],"en":"Microsoft Word is a word processor. After a crash, reopen Word and check Document Recovery or File → Info → Manage Document → Recover Unsaved Documents where available.","ru":"Microsoft Word — текстовый редактор. После сбоя открой Word и проверь Восстановление документов или Файл → Сведения → Управление документом → Восстановить несохранённые документы.","fi":"Microsoft Word on tekstinkäsittelyohjelma. Kaatumisen jälkeen tarkista Asiakirjan palauttaminen tai tallentamattomien asiakirjojen palautus."},{"id":"excel","a":["excel","microsoft excel","ms excel"],"en":"Microsoft Excel is a spreadsheet application. For formula problems, the exact error (#DIV/0!, #VALUE!, #NAME?, #REF!) and formula are important for diagnosis.","ru":"Microsoft Excel — электронные таблицы. Для диагностики формулы важны точная ошибка (#DIV/0!, #VALUE!, #NAME?, #REF!) и сама формула.","fi":"Microsoft Excel on taulukkolaskentaohjelma. Kaavaongelmassa tarkka virhekoodi ja kaava auttavat diagnostiikassa."},{"id":"powerpoint","a":["powerpoint","microsoft powerpoint","ppt"],"en":"Microsoft PowerPoint is presentation software. If fonts/media break on another PC, check installed fonts, codecs and whether media is embedded; export a PDF when only viewing is needed.","ru":"Microsoft PowerPoint — программа презентаций. Если на другом ПК ломаются шрифты/медиа, проверь шрифты, кодеки и способ добавления медиа; для просмотра можно экспортировать PDF.","fi":"Microsoft PowerPoint on esitysohjelma. Jos fontit/media rikkoutuvat toisella koneella, tarkista fontit, koodekit ja upotus."},{"id":"outlook","a":["outlook","microsoft outlook"],"en":"Outlook handles email/calendar. If mail does not send/receive, confirm Internet and webmail, check Work Offline and Outbox, restart Outlook and verify account sign-in.","ru":"Outlook работает с почтой/календарём. Если письма не идут, проверь интернет и webmail, автономный режим, Исходящие, перезапусти Outlook и проверь вход.","fi":"Outlook hoitaa sähköpostia/kalenteria. Jos posti ei kulje, tarkista internet/webmail, Offline-tila, Lähtevät ja kirjautuminen."},{"id":"teams","a":["teams","microsoft teams","ms teams"],"en":"Microsoft Teams provides chat/meetings. For microphone/camera trouble, check Teams Settings → Devices and Windows Privacy & security permissions, then close other apps using the camera.","ru":"Microsoft Teams — чат/встречи. При проблемах микрофона/камеры проверь Teams → Settings → Devices и разрешения Windows Privacy & security, затем закрой другие программы с камерой.","fi":"Microsoft Teams tarjoaa chatin/kokoukset. Mikrofoni-/kameraongelmassa tarkista Teamsin Devices-asetukset ja Windowsin käyttöoikeudet."},{"id":"usb","a":["usb","usb c","usb a"],"en":"USB connects peripherals and can carry data/power. USB-C describes the connector shape, not automatically the supported speed, charging power or video capability.","ru":"USB подключает периферию и передаёт данные/питание. USB‑C описывает форму разъёма и сам по себе не гарантирует скорость, мощность зарядки или видео.","fi":"USB yhdistää oheislaitteita ja siirtää dataa/virtaa. USB-C-liitin ei yksin kerro nopeutta, lataustehoa tai videotukea."},{"id":"hdmi","a":["hdmi","hdmi cable"],"en":"HDMI carries digital video and usually audio. For no picture, select the correct display input, reconnect both ends, try another cable/port and press Win+P in Windows.","ru":"HDMI передаёт цифровое видео и обычно звук. Если нет изображения, выбери правильный вход, переподключи кабель, попробуй другой порт/кабель и нажми Win+P.","fi":"HDMI siirtää digitaalista kuvaa ja yleensä ääntä. Jos kuvaa ei tule, tarkista oikea tulo, kaapeli/portti ja Windowsissa Win+P."},{"id":"displayport","a":["displayport","display port","dp"],"en":"DisplayPort is a digital display connection common on PCs/monitors. It carries video and usually audio and can support high resolutions/refresh rates depending on hardware/version.","ru":"DisplayPort — цифровой интерфейс мониторов/ПК. Он передаёт видео и обычно звук; разрешение/частота зависят от оборудования и версии.","fi":"DisplayPort on digitaalinen näyttöliitäntä, joka siirtää kuvaa ja yleensä ääntä."},{"id":"bluetooth","a":["bluetooth","bt"],"en":"Bluetooth is short-range wireless technology for devices such as headphones, mice and keyboards. If pairing fails, toggle Bluetooth, charge/restart the device, remove it and pair again, then check drivers.","ru":"Bluetooth — беспроводная связь малого радиуса для наушников, мышей, клавиатур. Если pairing не работает, выключи/включи Bluetooth, перезапусти устройство, удали и подключи заново, затем проверь драйвер.","fi":"Bluetooth on lyhyen kantaman langaton tekniikka. Yhteysongelmassa kytke Bluetooth pois/päälle, käynnistä laite uudelleen ja tee pariliitos uudelleen."},{"id":"device manager","a":["device manager","windows device manager"],"en":"Device Manager lists hardware recognized by Windows and its driver/status. A yellow warning icon usually indicates a device/driver problem.","ru":"Диспетчер устройств показывает оборудование, драйверы и состояние. Жёлтый значок обычно означает проблему устройства/драйвера.","fi":"Laitehallinta näyttää Windowsin tunnistaman laitteiston, ajurit ja tilan. Keltainen varoitusmerkki viittaa yleensä ongelmaan."},{"id":"cmd","a":["cmd","command prompt"],"en":"Command Prompt (cmd.exe) is Windows' classic command line. It can run tools such as ipconfig, ping and sfc. Understand unknown commands before running them as administrator.","ru":"Командная строка cmd.exe — классический CLI Windows. В ней запускаются ipconfig, ping, sfc и др. Не выполняй неизвестные команды от администратора.","fi":"Komentokehote cmd.exe on Windowsin perinteinen komentorivi. Siinä voi käyttää esimerkiksi ipconfig-, ping- ja sfc-komentoja."},{"id":"powershell","a":["powershell","windows powershell"],"en":"PowerShell is a powerful command shell and scripting environment. Do not paste unknown PowerShell commands from popups/videos/random sites because malicious scripts often abuse it.","ru":"PowerShell — мощная командная оболочка и среда скриптов. Не вставляй неизвестные команды из popups/видео/случайных сайтов.","fi":"PowerShell on tehokas komentokuori ja skriptiympäristö. Älä liitä tuntemattomia komentoja satunnaisista lähteistä."},{"id":"sfc","a":["sfc","sfc scannow","system file checker"],"en":"SFC checks protected Windows system files. From an Administrator terminal, sfc /scannow can repair some corruption; it does not fix every Windows or hardware problem.","ru":"SFC проверяет защищённые системные файлы Windows. В терминале администратора sfc /scannow может исправить часть повреждений, но не все проблемы.","fi":"SFC tarkistaa suojattuja Windows-järjestelmätiedostoja. Järjestelmänvalvojan terminaalissa sfc /scannow voi korjata osan vioista."},{"id":"dism","a":["dism","restorehealth"],"en":"DISM services/repairs the Windows component image. A common command is DISM /Online /Cleanup-Image /RestoreHealth, often followed by sfc /scannow.","ru":"DISM обслуживает/восстанавливает образ компонентов Windows. Часто используют DISM /Online /Cleanup-Image /RestoreHealth, затем sfc /scannow.","fi":"DISM huoltaa Windowsin komponenttikuvaa. Yleinen komento on DISM /Online /Cleanup-Image /RestoreHealth."},{"id":"format","a":["format","format drive","format disk","format usb"],"en":"Formatting prepares a storage volume with a file system and normally removes access to its existing file structure/data. Do not format a drive containing needed files just because Windows suggests it.","ru":"Форматирование создаёт файловую систему и обычно удаляет доступ к прежним данным. Не форматируй диск с нужными файлами только потому, что Windows предлагает это.","fi":"Alustaminen luo tiedostojärjestelmän ja yleensä poistaa pääsyn aiempiin tietoihin. Älä alusta tärkeää levyä vain Windowsin ehdotuksesta."},{"id":"ntfs","a":["ntfs","fat32","exfat","file system"],"en":"NTFS, exFAT and FAT32 are file systems. NTFS is normal for Windows internal drives; exFAT is useful for removable cross-platform drives; FAT32 has a 4 GB per-file limit.","ru":"NTFS, exFAT и FAT32 — файловые системы. NTFS типична для внутренних дисков Windows, exFAT удобна для съёмных дисков, FAT32 имеет лимит 4 ГБ на файл.","fi":"NTFS, exFAT ja FAT32 ovat tiedostojärjestelmiä. NTFS sopii Windowsin sisäisille levyille, exFAT siirrettäville levyille, FAT32:ssa tiedostoraja on 4 Gt."},{"id":"partition","a":["partition","disk partition","volume"],"en":"A partition is a logical region of a physical drive. Windows may have small EFI/recovery partitions required for boot/recovery; do not delete unfamiliar partitions randomly.","ru":"Раздел — логическая область физического диска. Windows может иметь маленькие EFI/Recovery разделы, нужные для загрузки; не удаляй их наугад.","fi":"Osio on fyysisen levyn looginen alue. Windowsissa voi olla pieniä EFI/palautusosioita, joita ei pidä poistaa sattumanvaraisesti."},{"id":"boot","a":["boot","booting","startup"],"en":"Booting is the process from power-on through firmware/bootloader into the operating system. 'No boot device', Automatic Repair, BSOD and black screen are different failure paths.","ru":"Boot/загрузка — процесс от включения через firmware/bootloader до ОС. No boot device, Automatic Repair, BSOD и чёрный экран — разные сценарии.","fi":"Käynnistys on prosessi virran kytkemisestä käyttöjärjestelmään. No boot device, Automatic Repair, BSOD ja musta ruutu ovat eri ongelmia."},{"id":"bsod","a":["bsod","blue screen","blue screen of death"],"en":"A Windows BSOD means Windows stopped because of a serious system/driver/hardware-level error. Record the stop code and what happened before it; repeated BSODs need deeper diagnosis.","ru":"BSOD означает серьёзную системную/драйверную/аппаратную ошибку Windows. Запиши stop code и что было перед сбоем; повторяющиеся BSOD требуют диагностики.","fi":"Windowsin BSOD tarkoittaa vakavaa järjestelmä-, ajuri- tai laitetason virhettä. Kirjaa stop-koodi ja tapahtumat ennen virhettä."},{"id":"overheating","a":["overheating","overheat","too hot","hot laptop","laptop hot"],"en":"For overheating: use a hard flat surface, keep vents clear, check heavy processes in Task Manager and updates. If the laptop shuts down from heat, smells burnt or has a swollen battery, stop using it and seek service.","ru":"При перегреве: твёрдая поверхность, свободная вентиляция, проверка тяжёлых процессов и обновлений. Если ноутбук выключается от жары, пахнет гарью или батарея вздулась — прекрати использование и обратись в сервис.","fi":"Ylikuumenemisessa käytä kovaa alustaa, pidä ilmanvaihto vapaana ja tarkista raskaat prosessit. Jos laite sammuu kuumuudesta, haisee palaneelta tai akku turpoaa, lopeta käyttö."},{"id":"thermal paste","a":["thermal paste","thermal compound"],"en":"Thermal paste improves heat transfer between a CPU/GPU and heatsink. Replacing old paste can help some machines, but disassembly carries damage risk and is not the first step for every hot laptop.","ru":"Термопаста улучшает передачу тепла между CPU/GPU и радиатором. Замена старой пасты иногда помогает, но разборка рискованна и это не первый шаг при любом перегреве.","fi":"Lämpötahna parantaa lämmönsiirtoa CPU/GPU:n ja jäähdyttimen välillä. Vaihto voi auttaa, mutta purkamiseen liittyy riski."},{"id":"refresh rate","a":["refresh rate","hz monitor","144hz","165hz"],"en":"Refresh rate is how many times per second a display can update, measured in Hz. Windows 11: Settings → System → Display → Advanced display.","ru":"Частота обновления — сколько раз в секунду экран обновляет изображение, измеряется в Гц. Windows 11: Параметры → Система → Дисплей → Расширенный дисплей.","fi":"Virkistystaajuus kertoo kuinka monta kertaa sekunnissa näyttö päivittyy, yksikkönä Hz."},{"id":"resolution","a":["resolution","screen resolution","display resolution","1080p","1440p","4k"],"en":"Display resolution is the pixel count, such as 1920×1080, 2560×1440 or 3840×2160. Use the monitor's recommended/native resolution for normal desktop use.","ru":"Разрешение — количество пикселей, например 1920×1080, 2560×1440 или 3840×2160. Обычно используй родное/рекомендованное разрешение монитора.","fi":"Näytön resoluutio on pikselimäärä, esimerkiksi 1920×1080. Käytä normaalisti näytön suositeltua/natiiviresoluutiota."},{"id":"fps","a":["fps","frames per second","frame rate"],"en":"FPS means frames per second. Low FPS can come from CPU/GPU limits, graphics settings, overheating, background tasks, drivers or insufficient RAM. It is different from network ping.","ru":"FPS — кадров в секунду. Низкий FPS может быть из-за CPU/GPU, настроек, перегрева, фоновых задач, драйверов или RAM. Это не то же самое, что ping.","fi":"FPS tarkoittaa ruutua sekunnissa. Matala FPS voi johtua CPU/GPU-rajoista, asetuksista, ylikuumenemisesta tai ajureista."},{"id":"psu","a":["psu","power supply","power supply unit"],"en":"PSU is the desktop PC power supply. A failing/inadequate PSU can cause shutdowns or restarts, but symptoms have other causes too. Never open a PSU enclosure because dangerous voltage can remain inside.","ru":"PSU — блок питания ПК. Неисправный/слабый PSU может вызывать выключения и перезапуски. Не вскрывай блок питания: внутри может сохраняться опасное напряжение.","fi":"PSU on pöytäkoneen virtalähde. Viallinen virtalähde voi aiheuttaa sammumisia/uudelleenkäynnistyksiä. Älä avaa virtalähdettä."},{"id":"motherboard","a":["motherboard","mainboard","mobo"],"en":"The motherboard is the main circuit board connecting CPU, RAM, storage, expansion cards and ports. Motherboard faults can mimic other hardware failures.","ru":"Материнская плата соединяет CPU, RAM, накопители, карты расширения и порты. Её неисправность может быть похожа на другие аппаратные проблемы.","fi":"Emolevy yhdistää CPU:n, RAM-muistin, tallennuslaitteet, laajennuskortit ja portit."},{"id":"cloud","a":["cloud","cloud storage","cloud computing"],"en":"Cloud computing/storage means using remote servers over a network instead of only local resources. OneDrive is cloud storage. Cloud data still needs account security and appropriate backups.","ru":"Облако — использование удалённых серверов через сеть вместо только локальных ресурсов. OneDrive — облачное хранилище. Облачным данным всё равно нужны безопасность аккаунта и backup.","fi":"Pilvi tarkoittaa etäpalvelimien käyttöä verkon kautta. OneDrive on pilvitallennus. Pilvitiedot tarvitsevat silti tiliturvaa ja varmuuskopioita."},{"id":"bandwidth","a":["bandwidth","internet bandwidth"],"en":"Bandwidth is how much data a connection can carry over time, commonly Mbps/Gbps. It is not the same as latency; high bandwidth can still have bad ping or packet loss.","ru":"Bandwidth — пропускная способность соединения, обычно Mbps/Gbps. Это не задержка: высокая скорость может сочетаться с плохим ping или packet loss.","fi":"Kaistanleveys kertoo kuinka paljon dataa yhteys siirtää, yleensä Mbps/Gbps. Se ei ole sama asia kuin viive."},{"id":"packet loss","a":["packet loss","packets lost","jitter"],"en":"Packet loss means some network packets never arrive. Jitter is variation in delay. Both can make games/calls stutter even when Mbps looks good.","ru":"Packet loss — часть пакетов не доходит; jitter — колебания задержки. Оба могут вызывать лаги даже при хорошей скорости Mbps.","fi":"Pakettihäviössä osa paketeista ei saavu; jitter on viiveen vaihtelua. Molemmat voivat aiheuttaa pätkimistä."},{"id":"2.4 ghz","a":["2.4 ghz","2.4ghz","wifi 2.4ghz"],"en":"2.4 GHz Wi‑Fi generally reaches farther and penetrates walls better but is more crowded; 5 GHz commonly gives higher speed at shorter range. Switching bands cannot exceed your Internet/router/device limits.","ru":"Wi‑Fi 2.4 ГГц обычно дальше и лучше проходит стены, но загруженнее; 5 ГГц обычно быстрее на меньшем расстоянии. Смена диапазона не превышает лимиты тарифа/роутера/устройства.","fi":"2,4 GHz kantaa yleensä pidemmälle, 5 GHz tarjoaa usein suuremman nopeuden lyhyemmällä etäisyydellä."},{"id":"5 ghz","a":["5 ghz","5ghz","wifi 5ghz"],"en":"5 GHz Wi‑Fi commonly supports higher speeds and less 2.4 GHz interference, but range through walls is usually shorter. It does not automatically make the ISP connection faster.","ru":"Wi‑Fi 5 ГГц обычно быстрее и менее загружен, но хуже проходит стены. Он не делает сам тариф/линию провайдера автоматически быстрее.","fi":"5 GHz Wi‑Fi tarjoaa usein suuremman nopeuden mutta lyhyemmän kantaman seinien läpi. Se ei automaattisesti nopeuta internetliittymää."},{"id":"404","a":["404","404 error","error 404"],"en":"HTTP 404 means the server was reached but the requested page/resource was not found. Check the URL or navigate from the site's home page; it is usually not a PC problem.","ru":"HTTP 404 означает, что сервер доступен, но страница не найдена. Проверь URL или перейди с главной страницы; обычно это не проблема ПК.","fi":"HTTP 404 tarkoittaa, että palvelin löytyi mutta pyydettyä sivua ei löytynyt."},{"id":"403","a":["403","403 error","error 403"],"en":"HTTP 403 means the server understood the request but refuses access, often because of permissions, security rules or account/network restrictions.","ru":"HTTP 403 означает, что сервер понял запрос, но запрещает доступ — часто из-за прав, security rules или ограничений аккаунта/сети.","fi":"HTTP 403 tarkoittaa, että palvelin ymmärsi pyynnön mutta estää pääsyn."},{"id":"500","a":["500","500 error","error 500"],"en":"HTTP 500 is a server-side error. If only one site shows it, the problem is usually on that site's server rather than your PC.","ru":"HTTP 500 — серверная ошибка. Если её показывает только один сайт, проблема обычно на стороне сайта, а не ПК.","fi":"HTTP 500 on palvelinpuolen virhe. Jos vain yksi sivusto näyttää sen, ongelma on yleensä palvelimella."}];
const norm=s=>(s||"").toLowerCase().replace(/[’']/g,"'").replace(/[?!.,:;()[\]{}"“”]/g," ").replace(/\s+/g," ").trim();
const lang=l=>{l=(l||"en").toLowerCase();return l.startsWith("ru")?"ru":l.startsWith("fi")?"fi":"en"};
const q=/^(what is|what's|whats|what does|define|meaning of|explain|tell me about|can you explain|что такое|что значит|объясни|что означает|mikä on|mitä tarkoittaa|selitä)\b/i;
function lookup(raw,l){
 const x=norm(raw), stripped=norm(x.replace(q,""));
 let best=null,score=0;
 for(const e of DB)for(const a0 of e.a){
   const a=norm(a0); let s=0;
   if(x===a||stripped===a)s=100;
   else if(x.split(" ").length<=4 && x.split(" ").includes(a))s=75;
   else if(q.test(x)&&(" "+x+" ").includes(" "+a+" "))s=85;
   if(s>score){score=s;best=e}
 }
 return best&&score>=75 ? best[lang(l)]||best.en : null;
}
window.ANITA_IT_KNOWLEDGE={version:"8.0",topics:DB,lookup,count:DB.length};
window.anitaKnowledgeAnswer=lookup;
if(window.ANITA_V7&&typeof window.ANITA_V7.handle==="function"){
 const old=window.ANITA_V7.handle.bind(window.ANITA_V7);
 window.ANITA_V7.handle=function(text,l){
   const k=lookup(text,l);
   if(k)return {type:"answer",text:k};
   return old(text,l);
 };
}
console.log("[ANITA v8] IT Knowledge Core:",DB.length,"topics");
})();

/* ================= ANITA v9 SEMANTIC INTENT ENGINE =================
   Deterministic, no external AI/API.
   Purpose:
   - understand natural, messy everyday phrases
   - tolerate small typos and filler words
   - detect "browser + page + starts + stops" style meaning
   - keep short conversational context
   - ask useful navigation questions instead of generic fallback
   - preserve v8 IT knowledge definitions underneath
   =================================================================== */
(function(){
"use strict";

const V9 = {};
V9.version = "9.0";
V9.lastSubject = null;
V9.lastIntent = null;
V9.lastQuestion = null;
V9.lastAnswer = null;
V9.turn = 0;

const L = l => {
  l=(l||"en").toLowerCase();
  if(l.startsWith("ru")) return "ru";
  if(l.startsWith("fi")) return "fi";
  return "en";
};

const raw = s => (s||"").toLowerCase()
  .replace(/[’`]/g,"'")
  .replace(/\s+/g," ")
  .trim();

const clean = s => raw(s)
  .replace(/[?!.,:;()[\]{}"“”]/g," ")
  .replace(/\s+/g," ")
  .trim();

const escapeRx = s => s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");

V9.replacements = [
  [/\bim\b/g,"i am"],
  [/\bive\b/g,"i have"],
  [/\bidk\b/g,"i do not know"],
  [/\bdunno\b/g,"i do not know"],
  [/\bcant\b/g,"cannot"],
  [/\bwont\b/g,"will not"],
  [/\bdoesnt\b/g,"does not"],
  [/\bisnt\b/g,"is not"],
  [/\bwasnt\b/g,"was not"],
  [/\bkinda\b/g,"kind of"],
  [/\bsorta\b/g,"sort of"],
  [/\bwtf\b/g,"what is going on"],
  [/\bwth\b/g,"what is going on"],
  [/\bdafuck\b/g,"what is going on"],
  [/\bdafuq\b/g,"what is going on"],
  [/\bdafug\b/g,"what is going on"],
  [/\bhassle\b/g,"problem"],
  [/\bhustle\b/g,"problem"],
  [/\bissue\b/g,"problem"],
  [/\btrouble\b/g,"problem"],
  [/\bglitchy\b/g,"glitching"],
  [/\bbuggy\b/g,"glitching"],
  [/\bacting weird\b/g,"glitching"],
  [/\bacting strange\b/g,"glitching"],
  [/\bfreaking out\b/g,"glitching"],
  [/\bnot responding\b/g,"freezing"],
  [/\bhangs\b/g,"freezing"],
  [/\bhanging\b/g,"freezing"],
  [/\blaggy\b/g,"slow"],
  [/\bsluggish\b/g,"slow"],
  [/\bpc\b/g,"computer"],
  [/\bcomp\b/g,"computer"],
  [/\brig\b/g,"computer"],
  [/\blappy\b/g,"laptop"],
  [/\bnotebook\b/g,"laptop"],
  [/\bwi fi\b/g,"wifi"],
  [/\bwi-fi\b/g,"wifi"],
  [/\bwlan\b/g,"wifi"],
  [/\bnet\b/g,"internet"],
  [/\bweb page\b/g,"webpage"],
  [/\bweb site\b/g,"website"],
  [/\bchrome\b/g,"browser"],
  [/\bfirefox\b/g,"browser"],
  [/\bedge\b/g,"browser"],
  [/\bopera\b/g,"browser"],
  [/\bbrave\b/g,"browser"],
  [/\bsafari\b/g,"browser"],
  [/\boc\b/g,"computer"],   // common typo for PC in this context
  [/\bwindwos\b/g,"windows"],
  [/\bwidnows\b/g,"windows"],
  [/\bwinodws\b/g,"windows"],
  [/\bbroswer\b/g,"browser"],
  [/\bbrower\b/g,"browser"],
  [/\bbrwoser\b/g,"browser"],
  [/\binterent\b/g,"internet"],
  [/\bintenet\b/g,"internet"],
  [/\bbluetooh\b/g,"bluetooth"],
  [/\bbluetoth\b/g,"bluetooth"]
];

V9.normalize = function(s){
  let t = " " + clean(s) + " ";
  for(const [rx,to] of V9.replacements) t=t.replace(rx," "+to+" ");
  return t.replace(/\s+/g," ").trim();
};

function dist(a,b){
  const m=Array.from({length:a.length+1},()=>Array(b.length+1).fill(0));
  for(let i=0;i<=a.length;i++)m[i][0]=i;
  for(let j=0;j<=b.length;j++)m[0][j]=j;
  for(let i=1;i<=a.length;i++){
    for(let j=1;j<=b.length;j++){
      m[i][j]=Math.min(
        m[i-1][j]+1,
        m[i][j-1]+1,
        m[i-1][j-1]+(a[i-1]===b[j-1]?0:1)
      );
    }
  }
  return m[a.length][b.length];
}

V9.wordLike = function(word,target){
  if(word===target) return true;
  if(target.length<5 || word.length<4) return false;
  return Math.abs(word.length-target.length)<=2 && dist(word,target)<=2;
};

V9.has = function(text, phrases){
  const t=V9.normalize(text);
  const words=t.split(/\s+/);
  for(const p0 of phrases){
    const p=V9.normalize(p0);
    if(!p) continue;
    if((" "+t+" ").includes(" "+p+" ")) return true;
    if(!p.includes(" ") && words.some(w=>V9.wordLike(w,p))) return true;
  }
  return false;
};

V9.groups = {
  browser:["browser","web browser"],
  page:["page","webpage","website","site","tab"],
  load:["load","loading","open","opening","render","display"],
  partial:["stops loading","stops","freezes","hangs","half loads","partially loads","loads forever","keeps loading","spinning","blank after loading"],
  notload:["does not load","will not load","cannot load","not loading","does not open","will not open","cannot open","blank page","white page"],
  slow:["slow","takes forever","very slow","loads slowly"],
  internet:["internet","wifi","connection","network"],
  glitch:["glitching","weird","strange","not right","messed up","behaving strangely"],
  windows:["windows","computer","laptop"],
  crash:["crash","crashing","closes","closes itself","shuts down app","app closes"],
  freeze:["freezing","frozen","stuck","not responding"],
  error:["error","error message","code","warning","popup"],
  download:["download","downloading","file download"],
  upload:["upload","uploading"],
  install:["install","installation","setup"],
  uninstall:["uninstall","remove program","remove app","delete program"],
  sound:["sound","audio","speaker","headphones"],
  mic:["microphone","mic"],
  camera:["camera","webcam"],
  printer:["printer","printing"],
  bluetooth:["bluetooth"],
  usb:["usb","flash drive","memory stick"],
  monitor:["monitor","screen","display"],
  office:["word","excel","powerpoint","outlook","office","microsoft 365"],
  email:["email","mail","outlook"],
  update:["update","windows update"],
  virus:["virus","malware","trojan","spyware","ransomware"],
  hot:["overheating","hot","too hot","heating up"],
  boot:["boot","startup","start windows","turn on"],
  power:["power","turn on","switch on"],
  storage:["disk","drive","storage","space","c drive"]
};

V9.phrases = {
  browser_partial: [
    "when i use my browser it loads page but then stops",
    "my browser loads the page and then stops",
    "page starts loading and then stops",
    "website starts loading but never finishes",
    "browser keeps loading forever",
    "page half loads",
    "site loads halfway",
    "browser opens page but then freezes",
    "page begins to load then gets stuck",
    "it loads some of the page then nothing",
    "the page spins forever",
    "browser loads and then hangs",
    "browser loads a bit and stops",
    "webpage gets stuck while loading"
  ],
  browser_notload: [
    "my browser is not loading the page",
    "browser does not load pages",
    "browser cannot open websites",
    "my browser wont open websites",
    "browser opens but pages do not",
    "website not opening in browser",
    "browser gives blank page",
    "browser shows white page",
    "i cannot use my browser because pages dont load",
    "i cant use my browser because websites dont open",
    "browser is open but nothing loads",
    "pages are not loading"
  ],
  browser_slow: [
    "browser is very slow",
    "pages load slowly",
    "browser takes forever to load sites",
    "websites open very slowly",
    "browser feels sluggish",
    "browser takes ages to open pages"
  ],
  windows_glitch: [
    "windows is glitching",
    "windows works weirdly",
    "windows acts weird",
    "windows behaves strangely",
    "my pc is glitching",
    "my computer is acting weird",
    "my laptop is acting strange",
    "windows loads normally but glitches",
    "computer works but something is wrong"
  ]
};

V9.answers = {
  browser_partial:{
    en:`Got it — the browser begins loading the page, but the page does not finish. We need to separate a browser problem from a website or Internet problem.

Please check these 3 things:
1. Does this happen on every website, or only one specific website?
2. Try the same page in another browser. Does it load there?
3. Try the same website on another device using the same Wi‑Fi.

Tell me the results of those three checks. If only one browser fails, we’ll check cache/extensions/settings. If every browser and device fails, we’ll look at the Internet/router/DNS side.`,
    ru:`Поняла — браузер начинает загружать страницу, но загрузка не заканчивается. Нужно отделить проблему браузера от проблемы сайта или интернета.

Проверьте 3 вещи:
1. Это происходит на всех сайтах или только на одном?
2. Откройте ту же страницу в другом браузере. Загружается?
3. Откройте тот же сайт на другом устройстве в той же Wi‑Fi сети.

Сообщите результаты. Если проблема только в одном браузере — проверим кэш/расширения/настройки. Если во всех браузерах и устройствах — будем проверять интернет/роутер/DNS.`,
    fi:`Selvä — selain aloittaa sivun lataamisen, mutta sivu ei valmistu. Erotetaan selainongelma sivusto- tai internetongelmasta.

Tarkista 3 asiaa:
1. Tapahtuuko tämä kaikilla sivustoilla vai vain yhdellä?
2. Avaa sama sivu toisella selaimella. Latautuuko se?
3. Avaa sama sivusto toisella laitteella samassa Wi‑Fi-verkossa.

Kerro tulokset. Jos vain yksi selain epäonnistuu, tarkistamme välimuistin/laajennukset/asetukset. Jos kaikki selaimet ja laitteet epäonnistuvat, tarkistamme internetin/reitittimen/DNS:n.`
  },
  browser_notload:{
    en:`Understood — the browser opens, but pages are not loading.

Let’s narrow it down:
1. Does another website open?
2. Does another browser work?
3. Does the Internet work on another device on the same Wi‑Fi?
4. Do you see an exact error such as "DNS_PROBE_FINISHED", "ERR_CONNECTION", "This site can’t be reached", 404, 403 or 500?

Send me the exact error if there is one. That tells us whether the problem is browser, DNS, network, or the website itself.`,
    ru:`Поняла — браузер открывается, но страницы не загружаются.

Уточним:
1. Открывается ли другой сайт?
2. Работает ли другой браузер?
3. Есть ли интернет на другом устройстве в той же Wi‑Fi сети?
4. Есть ли точная ошибка: DNS_PROBE_FINISHED, ERR_CONNECTION, "This site can’t be reached", 404, 403, 500?

Если есть ошибка — пришлите её полностью. По ней можно понять, проблема в браузере, DNS, сети или самом сайте.`,
    fi:`Selvä — selain avautuu, mutta sivut eivät lataudu.

Tarkistetaan:
1. Aukeaako toinen sivusto?
2. Toimiiko toinen selain?
3. Toimiiko internet toisella laitteella samassa Wi‑Fi-verkossa?
4. Näkyykö tarkka virhe, kuten DNS_PROBE_FINISHED, ERR_CONNECTION, "This site can’t be reached", 404, 403 tai 500?

Lähetä tarkka virhe, jos sellainen näkyy.`
  },
  browser_slow:{
    en:`If the browser works but is slow:
1. Close unnecessary tabs.
2. Try a private/incognito window.
3. Disable unnecessary extensions temporarily.
4. Clear cached files.
5. Update the browser.
6. Check Task Manager for high CPU/RAM/Disk usage.
7. Compare with another browser.

If every browser is slow, tell me whether other Internet apps are also slow — then we’ll check Wi‑Fi/Internet instead.`,
    ru:`Если браузер работает, но медленно:
1. Закройте лишние вкладки.
2. Проверьте в приватном окне.
3. Временно отключите ненужные расширения.
4. Очистите кэш.
5. Обновите браузер.
6. Проверьте CPU/RAM/Диск в Диспетчере задач.
7. Сравните с другим браузером.

Если тормозят все браузеры, напишите, медленно ли работают другие интернет‑программы — тогда проверим Wi‑Fi/интернет.`,
    fi:`Jos selain toimii mutta on hidas:
1. Sulje turhat välilehdet.
2. Kokeile yksityistä ikkunaa.
3. Poista turhat laajennukset väliaikaisesti.
4. Tyhjennä välimuisti.
5. Päivitä selain.
6. Tarkista Tehtävienhallinnasta CPU/RAM/Levy.
7. Vertaa toiseen selaimeen.

Jos kaikki selaimet ovat hitaita, kerro ovatko muut internet-sovellukset myös hitaita.`
  },
  windows_glitch:{
    en:`Got it — Windows is running, but something behaves abnormally. “Glitching” can mean several different problems.

Which is closest?
1. Screen/graphics flicker or visual artifacts
2. Programs freeze or close
3. Windows becomes slow
4. Error messages or popups appear
5. Mouse/keyboard behaves oddly
6. Explorer/taskbar/start menu stops responding
7. Something else

Tell me the number or describe what you see, and I’ll guide you from there.`,
    ru:`Поняла — Windows загружается, но ведёт себя ненормально. Под «глючит» может скрываться несколько разных проблем.

Что ближе?
1. Мигает экран/артефакты
2. Программы зависают или закрываются
3. Windows тормозит
4. Появляются ошибки/окна
5. Странно работают мышь/клавиатура
6. Зависают Проводник/панель задач/Пуск
7. Что-то другое

Напишите номер или опишите, что видите, и я продолжу диагностику.`,
    fi:`Selvä — Windows käynnistyy, mutta jokin toimii epänormaalisti. “Glitching” voi tarkoittaa eri ongelmia.

Mikä sopii parhaiten?
1. Näyttö/grafiikka vilkkuu
2. Ohjelmat jumittuvat tai sulkeutuvat
3. Windows hidastuu
4. Virheilmoituksia/ponnahdusikkunoita
5. Hiiri/näppäimistö toimii oudosti
6. Resurssienhallinta/tehtäväpalkki/Käynnistä jumittuu
7. Jotain muuta

Kerro numero tai kuvaile mitä näet.`
  }
};

function exactPhraseIntent(text){
  const t=V9.normalize(text);
  let best=null,bestScore=0;
  for(const [id,list] of Object.entries(V9.phrases)){
    for(const p of list){
      const n=V9.normalize(p);
      if(t===n) return id;
      let score=0;
      const tw=t.split(" "), pw=n.split(" ");
      for(const w of pw) if(tw.includes(w)) score++;
      score/=Math.max(1,pw.length);
      if(score>bestScore){bestScore=score;best=id;}
    }
  }
  return bestScore>=0.72 ? best : null;
}

function semanticIntent(text){
  const t=V9.normalize(text);

  const browser = V9.has(t,V9.groups.browser);
  const page = V9.has(t,V9.groups.page);
  const load = V9.has(t,V9.groups.load);
  const partial = V9.has(t,V9.groups.partial);
  const notload = V9.has(t,V9.groups.notload);
  const slow = V9.has(t,V9.groups.slow);

  if(browser && (page||load) && partial) return "browser_partial";
  if(browser && (page||load) && notload) return "browser_notload";
  if(browser && slow) return "browser_slow";

  if((V9.has(t,V9.groups.windows)) && V9.has(t,V9.groups.glitch)) return "windows_glitch";

  // Natural "I can't use my browser because ..." patterns.
  if(browser && /\b(cannot use|can't use|cant use|problem with|something wrong with)\b/i.test(raw(text))){
    if(partial) return "browser_partial";
    if(notload || page || load) return "browser_notload";
  }

  // Page loads then stops even when the user did not repeat "browser".
  if((page||browser) && /\b(loads?|loading)\b/i.test(t) && /\b(stops?|stuck|freezing|hangs?|forever)\b/i.test(t))
    return "browser_partial";

  return null;
}

V9.askForDetails = function(text,l){
  const lang=L(l), t=V9.normalize(text);

  // Browser mentioned but symptom unclear.
  if(V9.has(t,V9.groups.browser)){
    V9.lastSubject="browser";
    const q={
      en:`I understand the problem is with your browser. What exactly happens?
1. Browser does not open
2. Browser opens but pages do not load
3. Page starts loading and then stops
4. Browser is very slow
5. Browser freezes/crashes
6. Downloads do not work
7. Something else`,
      ru:`Поняла, проблема с браузером. Что именно происходит?
1. Браузер не открывается
2. Браузер открывается, но страницы не грузятся
3. Страница начинает грузиться и останавливается
4. Браузер очень медленный
5. Браузер зависает/вылетает
6. Не работают загрузки
7. Что-то другое`,
      fi:`Ymmärsin, että ongelma liittyy selaimeen. Mitä tarkalleen tapahtuu?
1. Selain ei avaudu
2. Selain avautuu, mutta sivut eivät lataudu
3. Sivu alkaa latautua ja pysähtyy
4. Selain on hyvin hidas
5. Selain jumittuu/kaatuu
6. Lataukset eivät toimi
7. Jotain muuta`
    };
    return q[lang];
  }

  if(V9.has(t,V9.groups.windows)){
    V9.lastSubject="windows";
    return V9.answers.windows_glitch[lang];
  }

  return null;
};

V9.handle = function(text,l){
  V9.turn++;
  const lang=L(l);
  let id = exactPhraseIntent(text) || semanticIntent(text);

  if(id && V9.answers[id]){
    V9.lastIntent=id;
    V9.lastAnswer=V9.answers[id][lang];
    if(id.startsWith("browser")) V9.lastSubject="browser";
    if(id==="windows_glitch") V9.lastSubject="windows";
    return {type:"answer",text:V9.lastAnswer};
  }

  const q=V9.askForDetails(text,l);
  if(q){
    V9.lastIntent="needs_details";
    V9.lastQuestion=q;
    return {type:"answer",text:q};
  }

  // Contextual short answers after browser navigation.
  const t=V9.normalize(text);
  if(V9.lastSubject==="browser"){
    if(/\b(stops?|stuck|forever|half|freezing|hangs?)\b/i.test(t))
      return {type:"answer",text:V9.answers.browser_partial[lang]};
    if(/\b(no|not|cannot|wont|won't|blank|white)\b/i.test(t) && /\b(load|open|page|site)\b/i.test(t))
      return {type:"answer",text:V9.answers.browser_notload[lang]};
    if(/\b(slow|slowly|ages|forever)\b/i.test(t))
      return {type:"answer",text:V9.answers.browser_slow[lang]};
  }

  return null;
};

window.ANITA_V9 = V9;

// Wrap v7 first if present.
if(window.ANITA_V7 && typeof window.ANITA_V7.handle==="function"){
  const oldV7 = window.ANITA_V7.handle.bind(window.ANITA_V7);
  window.ANITA_V7.handle=function(text,l){
    const r=V9.handle(text,l);
    if(r) return r;
    return oldV7(text,l);
  };
}

// Also expose a standalone hook.
window.anitaSemanticIntent = function(text,l){
  return V9.handle(text,l);
};

console.log("[ANITA v9] Semantic Intent Engine loaded");
})();

/* ================= ANITA v10 CONTEXT + STRICT TOKENS =================
   Fixes:
   - "parameters" must NEVER match computer RAM
   - "paramedic", "paraglider", etc. must never match RAM
   - strict whole-word / token matching for short IT terms
   - distinguish PC/computer problem from Windows problem
   - "weird / weirdly / strangely / somehow wrong / badly" becomes a
     navigation intent: ask WHAT exactly is happening
   - large natural-language phrase bank EN/RU/FI
   - contextual handling of "internet parameters/settings"
   ==================================================================== */
(function(){
"use strict";

const V10 = {};
V10.version = "10.0";
V10.phraseBank = {"en":["my pc is not working properly","my computer is not working right","my computer works weirdly","my pc works weirdly","my pc is acting weird","my computer is acting weird","my laptop is acting weird","windows is acting weird","windows is behaving weirdly","windows behaves strangely","my pc behaves strangely","my computer is behaving strangely","something is weird with my pc","something is weird with windows","something is wrong with my computer","something is wrong with windows","my pc feels wrong","windows feels wrong","my computer feels weird","my laptop feels weird","my pc is doing weird stuff","windows is doing weird stuff","my computer is doing strange things","my pc is acting strange","windows is acting strange","my computer is acting funny","my pc is acting funny","windows is acting funny","my pc is glitching","my computer is glitching","windows is glitching","my laptop is glitching","windows works but something is off","my pc works but something is off","my computer works but something is off","my pc is kind of broken","my computer is kind of broken","windows is kind of broken","my pc is behaving badly","windows is behaving badly","my computer is behaving badly","my pc works badly","windows works badly","my computer works badly","my pc is weirdly slow","windows is weirdly slow","my computer is weirdly slow","my laptop is weirdly slow","my pc is weirdly behaving","windows is weirdly behaving","my computer behaves weird","the pc behaves weird","windows behaves weird","my system behaves weird","my system is acting weird","my system is not acting normal","my computer is not acting normal","windows is not acting normal","my pc is not acting normal","my pc does strange things","windows does strange things","computer does strange things","the computer is behaving oddly","windows is behaving oddly","my pc is behaving oddly","my pc works somehow wrong","windows works somehow wrong","my computer works somehow wrong","my computer is messed up","windows is messed up","my pc is messed up","something is off with windows","something is off with my pc","something is off with my laptop","my laptop is not working properly"],"ru":["мой компьютер работает странно","мой пк работает странно","виндовс работает странно","windows работает странно","компьютер ведет себя странно","пк ведет себя странно","виндовс ведет себя странно","windows ведет себя странно","что то странное с компьютером","что то странное с пк","что то странное с windows","что то странное с виндовс","мой компьютер работает неправильно","мой пк работает неправильно","windows работает неправильно","виндовс работает неправильно","комп работает как то не так","пк работает как то не так","windows работает как то не так","виндовс работает как то не так","компьютер как то глючит","пк как то глючит","виндовс как то глючит","windows как то глючит","компьютер глючит","пк глючит","windows глючит","виндовс глючит","ноутбук глючит","ноут работает странно","комп ведет себя непонятно","пк ведет себя непонятно","windows ведет себя непонятно","компьютер тупит как то странно","пк тупит как то странно","windows тупит как то странно","виндовс тупит","компьютер ведет себя плохо","пк ведет себя плохо","windows ведет себя плохо","компьютер работает плохо","пк работает плохо","windows работает плохо","компьютер странно тормозит","пк странно тормозит","windows странно тормозит","ноутбук странно тормозит","что то не так с компьютером","что то не так с пк","что то не так с windows","что то не так с виндовс","система ведет себя странно","система работает странно","система работает не так","система глючит","мой комп делает странные вещи","мой пк делает странные вещи","windows делает странные вещи","виндовс делает странные вещи","компьютер чудит","пк чудит","виндовс чудит","windows чудит","комп работает криво","пк работает криво","windows работает криво","виндовс работает криво","компьютер работает как попало","пк работает как попало","windows работает как попало","виндовс работает как попало","с ноутбуком что то не так","ноутбук работает неправильно","ноутбук ведет себя странно"],"fi":["tietokone toimii oudosti","pc toimii oudosti","windows toimii oudosti","kone toimii oudosti","tietokone käyttäytyy oudosti","pc käyttäytyy oudosti","windows käyttäytyy oudosti","kone käyttäytyy oudosti","jokin on vialla tietokoneessa","jokin on vialla pc ssä","jokin on vialla windowsissa","jokin on vialla koneessa","tietokone ei toimi oikein","pc ei toimi oikein","windows ei toimi oikein","kone ei toimi oikein","tietokone toimii jotenkin väärin","pc toimii jotenkin väärin","windows toimii jotenkin väärin","kone toimii jotenkin väärin","tietokone bugittaa","pc bugittaa","windows bugittaa","kone bugittaa","läppäri bugittaa","tietokone sekoilee","pc sekoilee","windows sekoilee","kone sekoilee","läppäri sekoilee","tietokone käyttäytyy kummallisesti","pc käyttäytyy kummallisesti","windows käyttäytyy kummallisesti","kone käyttäytyy kummallisesti","tietokone toimii huonosti","pc toimii huonosti","windows toimii huonosti","kone toimii huonosti","tietokone toimii hitaasti oudolla tavalla","pc toimii oudosti hitaasti","windows toimii oudosti hitaasti","kone toimii oudosti hitaasti","läppäri toimii oudosti","jokin ei täsmää tietokoneessa","jokin ei täsmää pc ssä","jokin ei täsmää windowsissa","jokin ei täsmää koneessa","järjestelmä toimii oudosti","järjestelmä käyttäytyy oudosti","järjestelmä ei toimi normaalisti","tietokone ei käyttäydy normaalisti","pc ei käyttäydy normaalisti","windows ei käyttäydy normaalisti","kone ei käyttäydy normaalisti","tietokone tekee outoja asioita","pc tekee outoja asioita","windows tekee outoja asioita","kone tekee outoja asioita","tietokone tekee kummia","pc tekee kummia","windows tekee kummia","kone tekee kummia","tietokone on jotenkin sekaisin","pc on jotenkin sekaisin","windows on jotenkin sekaisin","kone on jotenkin sekaisin","jokin on pielessä windowsissa","jokin on pielessä tietokoneessa","jokin on pielessä pc ssä","jokin on pielessä koneessa","läppäri ei toimi oikein","läppäri käyttäytyy oudosti","läppäri tekee outoja asioita","läppäri toimii jotenkin väärin"]};
V10.lastSubject = null;
V10.lastIntent = null;
V10.lastUser = null;

const lang = l => {
  l=(l||"en").toLowerCase();
  if(l.startsWith("ru")) return "ru";
  if(l.startsWith("fi")) return "fi";
  return "en";
};

const clean = s => (s||"").toLowerCase()
 .replace(/[’`]/g,"'")
 .replace(/[?!.,:;()[\]{}"“”]/g," ")
 .replace(/\s+/g," ").trim();

const tokens = s => clean(s).split(/\s+/).filter(Boolean);

// STRICT token matching. "ram" only matches token "ram", never paRAMeters.
V10.hasToken = function(text, word){
  const w=clean(word);
  return tokens(text).includes(w);
};

V10.hasPhrase = function(text, phrase){
  const t=" "+clean(text)+" ";
  const p=" "+clean(phrase)+" ";
  return t.includes(p);
};

V10.anyToken = function(text, arr){
  const ts=new Set(tokens(text));
  return arr.some(x=>ts.has(clean(x)));
};

V10.anyPhrase = function(text, arr){
  return arr.some(x=>V10.hasPhrase(text,x));
};

// Guard words that contain "ram" as letters but have nothing to do with RAM.
V10.nonRamWords = [
 "parameter","parameters","paramedic","paramedics","paramount","paramecium",
 "parachute","paragliding","paraglider","paraplane","paraplan","paramara",
 "program","programs","programming","programmer","telegram","instagram",
 "grammar","diagram","panorama","camera","framework"
];

V10.isActualRamQuestion = function(text){
  const t=clean(text);
  // RAM must be a real standalone token or an explicit memory phrase.
  if(V10.hasToken(t,"ram")) return true;
  if(V10.anyPhrase(t,["random access memory","computer memory","system memory","memory usage","memory is full"])) return true;
  return false;
};

// If legacy ANITA sees "ram" inside a longer word, block that interpretation.
V10.containsFalseRamSubstring = function(text){
  const t=clean(text);
  if(V10.isActualRamQuestion(t)) return false;
  return V10.nonRamWords.some(w=>V10.hasToken(t,w));
};

const subjects = {
  pc:["pc","computer","laptop","desktop","machine","system","компьютер","пк","комп","ноутбук","ноут","tietokone","kone","läppäri"],
  windows:["windows","виндовс","винда"]
};

const weirdWords = {
  en:["weird","weirdly","strange","strangely","odd","oddly","wrong","badly","glitching","glitchy","funny","off","messed","broken","somehow"],
  ru:["странно","странный","странная","глючит","глючит","глюки","неправильно","плохо","криво","непонятно","чудит","тупит","как-то","как","попало"],
  fi:["oudosti","outo","kummallisesti","väärin","huonosti","bugittaa","sekoilee","pielessä","normaalisti","jotenkin"]
};

function detectSubject(text){
  const t=clean(text);
  // Windows is more specific than generic computer.
  if(subjects.windows.some(x=>V10.hasToken(t,x))) return "windows";
  if(subjects.pc.some(x=>V10.hasToken(t,x))) return "pc";
  return null;
}

function hasWeirdMeaning(text,l){
  const ll=lang(l), t=clean(text);
  const all=[...weirdWords.en,...weirdWords.ru,...weirdWords.fi];
  if(all.some(w => w.includes(" ") ? V10.hasPhrase(t,w) : V10.hasToken(t,w))) return true;

  const phrases=[
    "not working properly","not working right","does not work properly","doesn't work properly",
    "working weirdly","working strangely","acting weird","acting strange","behaving weirdly",
    "behaving strangely","something is wrong","something is off","not acting normal",
    "not working normally","works somehow wrong","kind of broken","doing weird stuff",
    "doing strange things","работает как то не так","работает как-то не так","что то не так",
    "что-то не так","ведет себя странно","ведёт себя странно","работает неправильно",
    "toimii jotenkin väärin","ei toimi oikein","käyttäytyy oudosti","jokin on vialla",
    "jokin on pielessä","ei käyttäydy normaalisti"
  ];
  return V10.anyPhrase(t,phrases);
}

function phraseBankMatch(text,l){
  const ll=lang(l), t=clean(text);
  const bank=V10.phraseBank[ll]||[];
  if(bank.some(p=>clean(p)===t)) return true;

  // Robust semantic-like score for natural variants.
  const ts=new Set(tokens(t));
  let best=0;
  for(const p of bank){
    const ps=tokens(p);
    let hit=0;
    for(const w of ps) if(ts.has(w)) hit++;
    const score=hit/Math.max(1,ps.length);
    if(score>best) best=score;
  }
  return best>=0.72;
}

function navAnswer(subject,l,text){
  const ll=lang(l);
  const slow = V10.anyToken(text,["slow","slowly","sluggish","laggy","тормозит","тупит","медленно","hidas","hitaasti"]);
  const name = subject==="windows"
    ? {en:"Windows",ru:"Windows",fi:"Windows"}[ll]
    : {en:"your computer",ru:"компьютер",fi:"tietokone"}[ll];

  if(ll==="en"){
    if(slow){
      return `I understand that ${name} is behaving unusually and also feels slow. What exactly happens when it becomes slow?

For example:
1. Everything becomes slow
2. Only the browser is slow
3. Programs take a long time to open
4. Mouse/window movement stutters
5. Disk usage goes to 100%
6. It becomes slow only after some time
7. Something else

Tell me what you notice. I’ll use that to choose the next diagnostic step.`;
    }
    return `I understand that ${name} is not behaving normally, but “weirdly” can mean many different things. What exactly is happening?

For example:
1. Programs freeze or close
2. Screen flickers or shows visual glitches
3. ${subject==="windows"?"Windows":"The computer"} becomes slow
4. Internet/browser stops working
5. Mouse or keyboard behaves strangely
6. Error messages appear
7. Sound, Bluetooth, USB or another device stops working
8. Something else

Describe what you actually see or what you were doing when it happens. Then I can narrow down the cause instead of guessing.`;
  }

  if(ll==="ru"){
    if(slow){
      return `Я понимаю, что ${name} ведёт себя необычно и при этом тормозит. Что именно происходит в момент замедления?

Например:
1. Тормозит вообще всё
2. Медленный только браузер
3. Программы долго открываются
4. Дёргается мышь/окна
5. Диск загружен на 100%
6. Тормоза появляются только через некоторое время
7. Что-то другое

Опиши, что именно замечаешь — тогда я выберу следующий шаг диагностики.`;
    }
    return `Я понимаю, что ${name} работает не так, как обычно, но слово «странно» может означать очень разные проблемы. Что именно происходит?

Например:
1. Программы зависают или закрываются
2. Экран мигает или появляются графические артефакты
3. ${subject==="windows"?"Windows":"Компьютер"} тормозит
4. Перестаёт работать интернет/браузер
5. Странно работают мышь или клавиатура
6. Появляются ошибки
7. Пропадает звук, Bluetooth, USB или другое устройство
8. Что-то другое

Опиши, что именно видишь и что делаешь в момент проблемы. Тогда я смогу сузить причину, а не гадать.`;
  }

  if(slow){
    return `Ymmärrän, että ${name} käyttäytyy epätavallisesti ja tuntuu myös hitaalta. Mitä tarkalleen tapahtuu hidastumisen aikana?

Esimerkiksi:
1. Kaikki hidastuu
2. Vain selain on hidas
3. Ohjelmat avautuvat hitaasti
4. Hiiri/ikkunat nykivät
5. Levyn käyttö nousee 100 %:iin
6. Hidastuminen alkaa vasta jonkin ajan kuluttua
7. Jotain muuta

Kuvaile mitä huomaat, niin valitsen seuraavan diagnostiikkavaiheen.`;
  }

  return `Ymmärrän, että ${name} ei käyttäydy normaalisti, mutta “oudosti” voi tarkoittaa monta eri ongelmaa. Mitä tarkalleen tapahtuu?

Esimerkiksi:
1. Ohjelmat jumittuvat tai sulkeutuvat
2. Näyttö vilkkuu tai kuvassa on häiriöitä
3. ${subject==="windows"?"Windows":"Tietokone"} hidastuu
4. Internet/selain lakkaa toimimasta
5. Hiiri tai näppäimistö toimii oudosti
6. Virheilmoituksia tulee
7. Ääni, Bluetooth, USB tai muu laite lakkaa toimimasta
8. Jotain muuta

Kuvaile mitä näet ja mitä olit tekemässä ongelman tapahtuessa. Näin voin rajata syyn enkä arvailla.`;
}

function internetParametersAnswer(l){
  const ll=lang(l);
  if(ll==="ru") return `Да, это может быть связано с сетевыми параметрами, но сначала нужно понять симптом. Под «параметрами интернета» обычно могут иметься в виду DNS, IP‑адрес, DHCP, шлюз, прокси, VPN или настройки сетевого адаптера.

Что именно происходит?
1. Wi‑Fi подключён, но сайты не открываются
2. Интернет пропадает время от времени
3. Только один браузер не работает
4. Интернет медленный
5. Windows пишет “No Internet”
6. Появляется конкретная ошибка

Напиши номер или точную ошибку — тогда я скажу, какие именно сетевые параметры проверять.`;

  if(ll==="fi") return `Kyllä, ongelma voi liittyä verkkoasetuksiin, mutta ensin pitää tietää oire. “Internet-asetuksilla” voidaan tarkoittaa esimerkiksi DNS:ää, IP-osoitetta, DHCP:tä, oletusyhdyskäytävää, välityspalvelinta, VPN:ää tai verkkosovittimen asetuksia.

Mitä tarkalleen tapahtuu?
1. Wi‑Fi on yhdistetty, mutta sivut eivät avaudu
2. Internet katkeilee
3. Vain yksi selain ei toimi
4. Internet on hidas
5. Windows näyttää “No Internet”
6. Näkyy tarkka virhe

Kerro numero tai tarkka virhe, niin voin neuvoa mitä verkkoasetusta tarkistaa.`;

  return `Yes — it can be related to network/Internet settings, but we should identify the symptom first. By “Internet parameters/settings” you might mean DNS, IP address, DHCP, default gateway, proxy, VPN, or the network-adapter configuration.

What exactly happens?
1. Wi‑Fi says connected but websites do not open
2. Internet disconnects randomly
3. Only one browser does not work
4. Internet is slow
5. Windows says “No Internet”
6. You see a specific error

Tell me the number or the exact error. Then I can tell you which network setting to check.`;
}

V10.handle = function(text,l){
  const t=clean(text), ll=lang(l);
  V10.lastUser=t;

  // 1) Specific fix for "internet parameters/settings" before any RAM logic.
  const internetCtx = V10.anyToken(t,["internet","wifi","network","сеть","интернет","verkko","internet"]);
  const paramCtx = V10.anyToken(t,["parameter","parameters","settings","setting","параметры","настройки","asetukset"]);
  if(internetCtx && paramCtx){
    V10.lastSubject="network";
    V10.lastIntent="network_settings";
    return {type:"answer",text:internetParametersAnswer(ll)};
  }

  // 2) Prevent false RAM interpretation of unrelated words.
  if(V10.containsFalseRamSubstring(t)){
    // If there is another recognizable context, let newer engines handle it.
    // Otherwise do not answer as RAM.
    if(internetCtx){
      V10.lastSubject="network";
      return {type:"answer",text:internetParametersAnswer(ll)};
    }
  }

  // 3) "weird / weirdly / wrong / badly / somehow" navigation.
  const sub=detectSubject(t);
  if(sub && (hasWeirdMeaning(t,ll) || phraseBankMatch(t,ll))){
    V10.lastSubject=sub;
    V10.lastIntent="general_abnormal_behavior";
    return {type:"answer",text:navAnswer(sub,ll,t)};
  }

  // 4) Contextual continuation: after user said PC/Windows is weird,
  // recognize a newly mentioned subsystem and let older semantic engines solve it.
  if(V10.lastIntent==="general_abnormal_behavior"){
    if(V10.anyToken(t,["browser","chrome","firefox","edge","браузер","selain"])){
      V10.lastSubject="browser";
      // do not consume; v9 browser engine can now answer
      return null;
    }
    if(V10.anyToken(t,["internet","wifi","network","интернет","сеть","verkko"])){
      V10.lastSubject="network";
      return null;
    }
  }

  return null;
};

window.ANITA_V10=V10;

// IMPORTANT: wrap the CURRENT V7 handler.
// At this point it already contains v8/v9 wrappers, so v10 gets first chance.
if(window.ANITA_V7 && typeof window.ANITA_V7.handle==="function"){
  const previous = window.ANITA_V7.handle.bind(window.ANITA_V7);
  window.ANITA_V7.handle=function(text,l){
    const r=V10.handle(text,l);
    if(r) return r;

    // Hard protection against old substring-based RAM matcher.
    // If "ram" is not a standalone token, legacy code must not answer RAM.
    if(V10.containsFalseRamSubstring(text)){
      const safeText = clean(text)
        .replace(/\bparameters?\b/g,"settings")
        .replace(/\bparamedic(s)?\b/g,"medical worker")
        .replace(/\bparaglider\b/g,"glider")
        .replace(/\bparaplane\b/g,"glider");
      return previous(safeText,l);
    }

    return previous(text,l);
  };
}

window.anitaStrictTokenMatch = V10.hasToken;
window.anitaV10Intent = V10.handle;

console.log("[ANITA v10] Context + Strict Tokens loaded. Phrase bank:",
  V10.phraseBank.en.length,"EN,",
  V10.phraseBank.ru.length,"RU,",
  V10.phraseBank.fi.length,"FI");
})();

/* ================= ANITA v11 GUIDED FOLLOW-UP ENGINE =================
   Makes short follow-ups such as:
   "how?", "how do I do that?", "как?", "как это сделать?",
   "miten?", "miten teen sen?"
   use the previous IT topic instead of repeating a generic answer.

   Deterministic / no external AI.
   ===================================================================== */
(function(){
"use strict";

const V11 = {};
V11.version = "11.0";
V11.lastTopic = null;
V11.lastAction = null;
V11.lastUserLanguage = "en";
V11.lastUserText = "";

const getLang = l => {
  l=(l||"").toLowerCase();
  if(l.startsWith("ru")) return "ru";
  if(l.startsWith("fi")) return "fi";
  return "en";
};

const clean = s => (s||"").toLowerCase()
  .replace(/[’`]/g,"'")
  .replace(/[?!.,:;()[\]{}"“”]/g," ")
  .replace(/\s+/g," ")
  .trim();

const toks = s => clean(s).split(/\s+/).filter(Boolean);
const hasToken = (s,w) => toks(s).includes(w);
const hasPhrase = (s,p) => (" "+clean(s)+" ").includes(" "+clean(p)+" ");

function detectLangFromText(text, fallback){
  const t=clean(text);
  if(/[а-яё]/i.test(text)) return "ru";
  if(/[äöå]/i.test(text) || /\b(miten|miksi|verkko|selain|tietokone|windowsissa|asetukset|toimi|toimii)\b/i.test(t)) return "fi";
  return getLang(fallback);
}

V11.isHowFollowup = function(text){
  const t=clean(text);
  const forms = [
    "how","how then","how do i do that","how do i do this","how can i do that",
    "how can i do this","how exactly","show me how","what do i do","what should i do",
    "what next","then what","and how","ok how","okay how",
    "как","как это сделать","как сделать","а как","и как","как именно","что делать",
    "что дальше","покажи как","объясни как","как проверить","как мне это сделать",
    "miten","miten se tehdään","miten teen sen","miten teen tämän","miten tarkistan",
    "mitä teen","mitä seuraavaksi","näytä miten","selitä miten","entä miten"
  ];
  if(forms.includes(t)) return true;
  // Short natural follow-up containing a how-word, but not a new detailed question.
  if(toks(t).length <= 6 && (/^how\b/.test(t) || /^как\b/.test(t) || /^miten\b/.test(t))) return true;
  return false;
};

V11.detectTopic = function(text){
  const t=clean(text);

  // Networking
  if(hasToken(t,"dns") || hasPhrase(t,"domain name system")) return "dns";
  if(hasToken(t,"isp") || hasPhrase(t,"internet service provider") || hasPhrase(t,"интернет провайдер") || hasToken(t,"провайдер") || hasToken(t,"operaattori")) return "isp";
  if(hasToken(t,"dhcp")) return "dhcp";
  if(hasPhrase(t,"ip address") || hasPhrase(t,"ip адрес") || hasPhrase(t,"ip-osoite") || hasToken(t,"ip")) return "ip";
  if(hasToken(t,"gateway") || hasToken(t,"шлюз") || hasToken(t,"yhdyskäytävä")) return "gateway";
  if(hasToken(t,"proxy") || hasToken(t,"прокси") || hasToken(t,"välityspalvelin")) return "proxy";
  if(hasToken(t,"vpn")) return "vpn";
  if(hasPhrase(t,"network reset") || hasPhrase(t,"сброс сети") || hasPhrase(t,"verkon nollaus")) return "network_reset";
  if(hasToken(t,"wifi") || hasToken(t,"wi-fi") || hasToken(t,"вайфай") || hasToken(t,"wlan")) return "wifi";
  if(hasToken(t,"router") || hasToken(t,"роутер") || hasToken(t,"reititin")) return "router";

  // Windows / diagnostics
  if(hasPhrase(t,"flushdns") || hasPhrase(t,"ipconfig flushdns")) return "dns";
  if(hasToken(t,"sfc") || hasPhrase(t,"system file checker")) return "sfc";
  if(hasToken(t,"dism")) return "dism";
  if(hasPhrase(t,"safe mode") || hasPhrase(t,"безопасный режим") || hasPhrase(t,"vikasietotila")) return "safe_mode";
  if(hasPhrase(t,"restore point") || hasPhrase(t,"точка восстановления") || hasPhrase(t,"palautuspiste")) return "restore_point";
  if(hasPhrase(t,"windows update") || hasPhrase(t,"обновление windows") || hasPhrase(t,"windows päivitys")) return "windows_update";
  if(hasPhrase(t,"device manager") || hasPhrase(t,"диспетчер устройств") || hasPhrase(t,"laitehallinta")) return "device_manager";
  if(hasToken(t,"driver") || hasToken(t,"drivers") || hasToken(t,"драйвер") || hasToken(t,"драйверы") || hasToken(t,"ajuri") || hasToken(t,"ajurit")) return "drivers";
  if(hasPhrase(t,"task manager") || hasPhrase(t,"диспетчер задач") || hasPhrase(t,"tehtävienhallinta")) return "task_manager";

  // Browser / security
  if(hasPhrase(t,"clear cache") || hasToken(t,"cache") || hasToken(t,"кэш") || hasToken(t,"välimuisti")) return "browser_cache";
  if(hasToken(t,"virus") || hasToken(t,"malware") || hasToken(t,"вирус") || hasToken(t,"вредонос") || hasToken(t,"haittaohjelma")) return "malware_scan";
  if(hasToken(t,"defender") || hasPhrase(t,"windows security") || hasPhrase(t,"безопасность windows")) return "defender_scan";

  // Apps
  if(hasToken(t,"uninstall") || hasToken(t,"удалить") || hasToken(t,"poistaa")) return "uninstall_app";
  if(hasPhrase(t,"restart router") || hasPhrase(t,"перезагрузить роутер") || hasPhrase(t,"käynnistä reititin uudelleen")) return "router_restart";

  return null;
};

const STEPS = {
dns:{
en:`Sure. If ANITA suggested flushing DNS or trying another DNS server, do it like this.

A) Flush the DNS cache:
1. Press Windows key.
2. Type cmd.
3. Right-click Command Prompt → Run as administrator.
4. Type: ipconfig /flushdns
5. Press Enter.
6. You should see a message that the DNS Resolver Cache was successfully flushed.
7. Close the browser completely, reopen it and test the website again.

B) If that does not help, try a different DNS server:
1. Press Windows + R.
2. Type ncpa.cpl and press Enter.
3. Right-click your active Wi-Fi or Ethernet connection → Properties.
4. Double-click Internet Protocol Version 4 (TCP/IPv4).
5. Select “Use the following DNS server addresses”.
6. For a test you can use:
   Preferred DNS: 1.1.1.1
   Alternate DNS: 1.0.0.1
7. Press OK → Close.
8. Reopen the browser and test again.

If you tell me what happens after step A, I can tell you whether you even need step B.`,
ru:`Конечно. Если ANITA предложила очистить DNS-кэш или попробовать другой DNS, сделай так.

A) Сначала очистим DNS-кэш:
1. Нажми клавишу Windows.
2. Напиши cmd.
3. Нажми правой кнопкой на «Командная строка» → «Запуск от имени администратора».
4. Введи: ipconfig /flushdns
5. Нажми Enter.
6. Должно появиться сообщение об успешной очистке DNS Resolver Cache.
7. Полностью закрой браузер, открой снова и проверь сайт.

B) Если не помогло — можно временно поставить другой DNS:
1. Нажми Windows + R.
2. Введи ncpa.cpl → Enter.
3. Правой кнопкой по активному Wi‑Fi или Ethernet → «Свойства».
4. Дважды нажми «IP версии 4 (TCP/IPv4)».
5. Выбери «Использовать следующие адреса DNS-серверов».
6. Для проверки можно указать:
   Предпочитаемый DNS: 1.1.1.1
   Альтернативный DNS: 1.0.0.1
7. Нажми OK → Закрыть.
8. Снова открой браузер и проверь сайт.

Напиши, что произошло после шага A — тогда я скажу, нужен ли вообще шаг B.`,
fi:`Totta. Jos ANITA ehdotti DNS-välimuistin tyhjentämistä tai toisen DNS-palvelimen kokeilemista, tee näin.

A) Tyhjennä ensin DNS-välimuisti:
1. Paina Windows-näppäintä.
2. Kirjoita cmd.
3. Napsauta Komentokehotetta hiiren oikealla → Suorita järjestelmänvalvojana.
4. Kirjoita: ipconfig /flushdns
5. Paina Enter.
6. Näytölle pitäisi tulla ilmoitus, että DNS Resolver Cache tyhjennettiin onnistuneesti.
7. Sulje selain kokonaan, avaa se uudelleen ja testaa sivua.

B) Jos tämä ei auta, kokeile toista DNS-palvelinta:
1. Paina Windows + R.
2. Kirjoita ncpa.cpl → Enter.
3. Napsauta aktiivista Wi-Fi- tai Ethernet-yhteyttä oikealla → Ominaisuudet.
4. Avaa Internet Protocol Version 4 (TCP/IPv4).
5. Valitse “Use the following DNS server addresses”.
6. Testiksi voit käyttää:
   Preferred DNS: 1.1.1.1
   Alternate DNS: 1.0.0.1
7. Paina OK → Close.
8. Avaa selain uudelleen ja testaa.

Kerro mitä tapahtui vaiheen A jälkeen, niin voin sanoa tarvitaanko vaihetta B.`
},
isp:{
en:`Here is how to check whether the problem is your ISP rather than your computer.

1. Check another device on the same Wi‑Fi, for example your phone.
2. If the second device also has no Internet, look at the router.
3. Check the Internet/WAN light. If it is red, orange, blinking unusually, or completely off, the connection from the ISP may be down.
4. Restart the router: unplug its power cable, wait about 30 seconds, plug it back in, then wait 3–5 minutes.
5. Test the Internet again on two devices.
6. If both devices are still offline, use mobile data on your phone and open your ISP’s service-status/outage page or contact their support.
7. If only your PC is offline while the phone works on the same Wi‑Fi, the ISP is probably not the cause — then we should troubleshoot Windows/network settings on the PC.

Tell me: does Internet work on your phone while it is connected to the same Wi‑Fi?`,
ru:`Вот как проверить, виноват ли интернет‑провайдер, а не сам компьютер.

1. Проверь интернет на другом устройстве в той же Wi‑Fi сети, например на телефоне.
2. Если на втором устройстве интернета тоже нет — посмотри на роутер.
3. Проверь индикатор Internet/WAN. Если он красный, оранжевый, необычно мигает или вообще не горит, соединение со стороны провайдера может отсутствовать.
4. Перезагрузи роутер: отключи питание примерно на 30 секунд, включи обратно и подожди 3–5 минут.
5. Снова проверь интернет минимум на двух устройствах.
6. Если оба устройства всё ещё без интернета, включи мобильный интернет на телефоне и проверь страницу с авариями/статусом сети своего провайдера или свяжись с его поддержкой.
7. Если телефон в том же Wi‑Fi работает, а только ПК — нет, провайдер скорее всего ни при чём. Тогда нужно проверять настройки Windows/сети на компьютере.

Скажи мне: интернет на телефоне работает, когда телефон подключён к тому же Wi‑Fi?`,
fi:`Näin voit tarkistaa, johtuuko ongelma internet-operaattorista eikä tietokoneesta.

1. Testaa internet toisella laitteella samassa Wi‑Fi-verkossa, esimerkiksi puhelimella.
2. Jos toisellakaan laitteella ei ole internetiä, tarkista reititin.
3. Katso Internet/WAN-merkkivaloa. Jos se on punainen, oranssi, vilkkuu oudosti tai ei pala lainkaan, operaattorin yhteys voi olla poikki.
4. Käynnistä reititin uudelleen: irrota virtajohto noin 30 sekunniksi, kytke takaisin ja odota 3–5 minuuttia.
5. Testaa internet uudelleen kahdella laitteella.
6. Jos molemmat ovat edelleen ilman internetiä, käytä puhelimen mobiilidataa ja tarkista operaattorin häiriö-/palvelutilasivu tai ota yhteyttä tukeen.
7. Jos puhelin toimii samassa Wi‑Fi-verkossa mutta tietokone ei, operaattori ei todennäköisesti ole syy — silloin tarkistetaan Windowsin verkkoasetukset.

Kerro: toimiiko internet puhelimessa, kun se on samassa Wi‑Fi-verkossa?`
},
router_restart:{
en:`To restart the router safely:
1. Find the router/modem that provides your Wi‑Fi.
2. Do not press the small RESET button.
3. Unplug only the power cable.
4. Wait about 30 seconds.
5. Plug the power cable back in.
6. Wait 3–5 minutes for the Internet/WAN and Wi‑Fi lights to stabilize.
7. Reconnect your PC and test the Internet.`,
ru:`Чтобы безопасно перезагрузить роутер:
1. Найди роутер/модем, который раздаёт Wi‑Fi.
2. Не нажимай маленькую кнопку RESET.
3. Отключи только кабель питания.
4. Подожди около 30 секунд.
5. Подключи питание обратно.
6. Подожди 3–5 минут, пока индикаторы Internet/WAN и Wi‑Fi стабилизируются.
7. Подключись с ПК и снова проверь интернет.`,
fi:`Reitittimen turvallinen uudelleenkäynnistys:
1. Etsi Wi‑Fiä jakava reititin/modeemi.
2. Älä paina pientä RESET-painiketta.
3. Irrota vain virtajohto.
4. Odota noin 30 sekuntia.
5. Kytke virtajohto takaisin.
6. Odota 3–5 minuuttia, kunnes Internet/WAN- ja Wi‑Fi-valot tasaantuvat.
7. Yhdistä tietokone uudelleen ja testaa internet.`
},
wifi:{
en:`To reconnect Wi‑Fi in Windows:
1. Click the network icon near the clock.
2. Turn Wi‑Fi off.
3. Wait 10 seconds.
4. Turn Wi‑Fi back on.
5. Select your network → Connect.
6. If it still fails, choose the network → Forget, then reconnect and enter the Wi‑Fi password again.
7. If Windows says “Connected, no Internet”, tell me that exact message.`,
ru:`Чтобы переподключить Wi‑Fi в Windows:
1. Нажми значок сети возле часов.
2. Выключи Wi‑Fi.
3. Подожди 10 секунд.
4. Включи Wi‑Fi снова.
5. Выбери свою сеть → «Подключиться».
6. Если не помогло, выбери сеть → «Забыть», затем подключись заново и введи пароль Wi‑Fi.
7. Если Windows пишет «Подключено, без доступа к Интернету», сообщи мне эту точную надпись.`,
fi:`Wi‑Fi-yhteyden muodostaminen uudelleen Windowsissa:
1. Napsauta kellon lähellä olevaa verkkokuvaketta.
2. Sammuta Wi‑Fi.
3. Odota 10 sekuntia.
4. Käynnistä Wi‑Fi uudelleen.
5. Valitse oma verkko → Yhdistä.
6. Jos se ei auta, valitse verkko → Unohda ja yhdistä uudelleen salasanalla.
7. Jos Windows näyttää “Connected, no Internet”, kerro tarkka ilmoitus.`
},
network_reset:{
en:`Windows network reset is a stronger step, so use it after simpler checks:
1. Open Settings.
2. Go to Network & Internet.
3. Open Advanced network settings.
4. Choose Network reset.
5. Click Reset now.
6. Confirm.
7. Windows will remove and reinstall network adapters and then restart.
8. After restart, reconnect to Wi‑Fi and test again.

Note: saved VPN/network adapter settings may need to be configured again.`,
ru:`Сброс сети Windows — более сильный шаг, поэтому его лучше делать после простых проверок:
1. Открой «Параметры».
2. Перейди «Сеть и Интернет».
3. Открой «Дополнительные сетевые параметры».
4. Выбери «Сброс сети».
5. Нажми «Сбросить сейчас».
6. Подтверди.
7. Windows удалит и заново установит сетевые адаптеры, после чего перезагрузится.
8. После перезапуска снова подключись к Wi‑Fi и проверь.

Важно: VPN и некоторые специальные сетевые настройки могут потребовать повторной настройки.`,
fi:`Windowsin verkon nollaus on voimakkaampi toimenpide, joten tee se vasta yksinkertaisten testien jälkeen:
1. Avaa Asetukset.
2. Avaa Verkko ja Internet.
3. Avaa Verkon lisäasetukset.
4. Valitse Verkon nollaus.
5. Paina Reset now.
6. Vahvista.
7. Windows poistaa ja asentaa verkkosovittimet uudelleen ja käynnistyy uudelleen.
8. Yhdistä Wi‑Fiin uudelleen ja testaa.

Huom: VPN- ja erikoisverkkoasetukset voivat vaatia uuden määrityksen.`
},
task_manager:{
en:`To open Task Manager and check what is slowing the PC:
1. Press Ctrl + Shift + Esc.
2. If you see a small window, click More details.
3. Open the Processes tab.
4. Click CPU, Memory or Disk at the top to sort from highest usage.
5. Look for a program that stays unusually high.
6. Do not end Windows/system processes unless you know what they are.
7. Tell me the top 3 items and their CPU/Memory/Disk percentages.`,
ru:`Чтобы открыть Диспетчер задач и посмотреть, что тормозит ПК:
1. Нажми Ctrl + Shift + Esc.
2. Если открылось маленькое окно — нажми «Подробнее».
3. Открой вкладку «Процессы».
4. Нажми сверху CPU/ЦП, Память или Диск, чтобы отсортировать по нагрузке.
5. Посмотри, какая программа долго остаётся сверху с высокой нагрузкой.
6. Не завершай системные процессы Windows, если не знаешь, что это.
7. Напиши мне 3 верхних процесса и проценты CPU/Память/Диск.`,
fi:`Tehtävienhallinnan avaaminen ja hidastavan ohjelman tarkistus:
1. Paina Ctrl + Shift + Esc.
2. Jos näkyy pieni ikkuna, valitse More details.
3. Avaa Processes-välilehti.
4. Napsauta CPU, Memory tai Disk lajittelua.
5. Katso mikä ohjelma pysyy pitkään korkealla.
6. Älä lopeta Windowsin järjestelmäprosesseja, ellet tiedä mitä ne ovat.
7. Kerro kolme ylintä prosessia ja niiden CPU/Memory/Disk-prosentit.`
},
browser_cache:{
en:`To test whether browser cache is the problem:
1. First open the same page in a private/incognito window.
2. If it works there, cache/cookies or an extension may be involved.
3. In Chrome/Edge press Ctrl + Shift + Delete.
4. Choose Cached images and files.
5. Start with cached files only; you do not have to delete saved passwords.
6. Clear the data.
7. Restart the browser and test again.`,
ru:`Чтобы проверить, виноват ли кэш браузера:
1. Сначала открой тот же сайт в режиме инкогнито/приватном окне.
2. Если там всё работает, проблема может быть в кэше, cookies или расширении.
3. В Chrome/Edge нажми Ctrl + Shift + Delete.
4. Выбери «Кэшированные изображения и файлы».
5. Для начала не нужно удалять сохранённые пароли.
6. Очисти данные.
7. Перезапусти браузер и проверь снова.`,
fi:`Selaimen välimuistin testaaminen:
1. Avaa sama sivu ensin yksityisessä/incognito-ikkunassa.
2. Jos se toimii siellä, syy voi olla välimuisti, eväste tai laajennus.
3. Chromessa/Edgessä paina Ctrl + Shift + Delete.
4. Valitse Cached images and files.
5. Tallennettuja salasanoja ei tarvitse poistaa.
6. Tyhjennä tiedot.
7. Käynnistä selain uudelleen ja testaa.`
},
windows_update:{
en:`To check Windows Update:
1. Press Windows + I.
2. Open Windows Update.
3. Click Check for updates.
4. Install normal security/quality updates.
5. Restart if Windows asks.
6. After restart, return to Windows Update once more and check again.
If the problem started immediately after an update, tell me — the next steps are different.`,
ru:`Чтобы проверить Windows Update:
1. Нажми Windows + I.
2. Открой «Центр обновления Windows».
3. Нажми «Проверить наличие обновлений».
4. Установи обычные обновления безопасности/качества.
5. Перезагрузи ПК, если Windows попросит.
6. После перезагрузки снова открой Windows Update и ещё раз проверь обновления.
Если проблема началась сразу после обновления — скажи мне, тогда действия будут другими.`,
fi:`Windows Updaten tarkistus:
1. Paina Windows + I.
2. Avaa Windows Update.
3. Paina Check for updates.
4. Asenna tavalliset tietoturva- ja laatu-päivitykset.
5. Käynnistä tietokone uudelleen pyydettäessä.
6. Tarkista päivitykset vielä kerran uudelleenkäynnistyksen jälkeen.
Jos ongelma alkoi heti päivityksen jälkeen, kerro siitä — seuraavat vaiheet ovat silloin eri.`
},
drivers:{
en:`To check a driver:
1. Right-click Start → Device Manager.
2. Look for a device with a yellow warning symbol.
3. Open the relevant category, for example Display adapters, Network adapters, Bluetooth or Sound.
4. Right-click the device → Properties.
5. Check Device status for an error code.
6. Tell me the device name and error code before uninstalling anything.
For graphics/network drivers, the safest source is usually the PC/device manufacturer's official support page.`,
ru:`Чтобы проверить драйвер:
1. Правой кнопкой по «Пуск» → «Диспетчер устройств».
2. Найди устройство с жёлтым значком предупреждения.
3. Открой нужный раздел: Видеоадаптеры, Сетевые адаптеры, Bluetooth, Звук и т. д.
4. Правой кнопкой по устройству → «Свойства».
5. Посмотри «Состояние устройства» и код ошибки.
6. Перед удалением чего-либо напиши мне название устройства и код ошибки.
Для видеокарты/сети безопаснее всего брать драйвер с официального сайта производителя устройства или ПК.`,
fi:`Ajurin tarkistus:
1. Napsauta Käynnistä oikealla → Laitehallinta.
2. Etsi laite, jossa on keltainen varoitusmerkki.
3. Avaa sopiva luokka, esim. Näytönohjaimet, Verkkosovittimet, Bluetooth tai Ääni.
4. Napsauta laitetta oikealla → Ominaisuudet.
5. Tarkista Device status ja mahdollinen virhekoodi.
6. Kerro laitteen nimi ja virhekoodi ennen kuin poistat mitään.
Grafiikka- ja verkkoajurit kannattaa hakea laitteen/tietokoneen valmistajan viralliselta tukisivulta.`
},
sfc:{
en:`To run SFC:
1. Press Windows key and type cmd.
2. Right-click Command Prompt → Run as administrator.
3. Type: sfc /scannow
4. Press Enter.
5. Let it reach 100%; do not close the window.
6. Tell me the final message exactly — for example whether Windows found corrupt files and repaired them.`,
ru:`Чтобы запустить SFC:
1. Нажми Windows и напиши cmd.
2. Правой кнопкой по «Командная строка» → «Запуск от имени администратора».
3. Введи: sfc /scannow
4. Нажми Enter.
5. Дождись 100%, не закрывая окно.
6. Пришли мне последнюю строку результата — особенно пишет ли Windows, что повреждённые файлы найдены и исправлены.`,
fi:`SFC-tarkistus:
1. Paina Windows ja kirjoita cmd.
2. Napsauta Komentokehotetta oikealla → Suorita järjestelmänvalvojana.
3. Kirjoita: sfc /scannow
4. Paina Enter.
5. Odota 100 %:iin asti sulkematta ikkunaa.
6. Kerro lopullinen viesti tarkasti — löysikö Windows vioittuneita tiedostoja ja korjasiko se ne.`
},
dism:{
en:`To repair the Windows component image with DISM:
1. Open Command Prompt as administrator.
2. Type: DISM /Online /Cleanup-Image /RestoreHealth
3. Press Enter.
4. Leave it running even if the percentage seems stuck for a while.
5. Wait for completion.
6. Restart Windows.
7. Then run: sfc /scannow
8. Tell me whether DISM completed successfully.`,
ru:`Чтобы восстановить хранилище компонентов Windows через DISM:
1. Открой Командную строку от имени администратора.
2. Введи: DISM /Online /Cleanup-Image /RestoreHealth
3. Нажми Enter.
4. Не закрывай окно, даже если процент какое-то время не меняется.
5. Дождись завершения.
6. Перезагрузи Windows.
7. Затем запусти: sfc /scannow
8. Напиши, завершился ли DISM успешно.`,
fi:`Windows-komponenttikuvan korjaaminen DISM:llä:
1. Avaa Komentokehote järjestelmänvalvojana.
2. Kirjoita: DISM /Online /Cleanup-Image /RestoreHealth
3. Paina Enter.
4. Anna sen jatkaa, vaikka prosentti näyttäisi pysähtyneen hetkeksi.
5. Odota valmistumista.
6. Käynnistä Windows uudelleen.
7. Suorita sitten: sfc /scannow
8. Kerro valmistuiko DISM onnistuneesti.`
},
safe_mode:{
en:`To enter Safe Mode in Windows 11/10:
1. Hold Shift while clicking Restart from the Start menu.
2. Choose Troubleshoot.
3. Advanced options.
4. Startup Settings.
5. Restart.
6. After restart press 4 for Safe Mode, or 5 for Safe Mode with Networking.
7. Test whether the same problem happens there.
If the problem disappears in Safe Mode, a startup app, driver or third-party service becomes more likely.`,
ru:`Чтобы войти в безопасный режим Windows 10/11:
1. Зажми Shift и, не отпуская, нажми «Перезагрузка» в меню Пуск.
2. Выбери «Поиск и устранение неисправностей».
3. «Дополнительные параметры».
4. «Параметры загрузки».
5. «Перезагрузить».
6. После перезагрузки нажми 4 для безопасного режима или 5 для безопасного режима с сетью.
7. Проверь, повторяется ли проблема.
Если в безопасном режиме проблемы нет, вероятнее виноваты автозагрузка, драйвер или сторонняя служба.`,
fi:`Windows 10/11 vikasietotilaan:
1. Pidä Shift pohjassa ja valitse Käynnistä-valikosta Käynnistä uudelleen.
2. Valitse Troubleshoot.
3. Advanced options.
4. Startup Settings.
5. Restart.
6. Paina uudelleenkäynnistyksen jälkeen 4 (Safe Mode) tai 5 (Safe Mode with Networking).
7. Testaa esiintyykö sama ongelma.
Jos ongelma katoaa vikasietotilassa, syy voi olla käynnistysohjelmassa, ajurissa tai kolmannen osapuolen palvelussa.`
},
defender_scan:{
en:`To run a Microsoft Defender scan:
1. Open Start and search Windows Security.
2. Open Virus & threat protection.
3. Click Quick scan first.
4. If you suspect malware or the quick scan finds something, open Scan options.
5. Choose Full scan for a deeper check.
6. Let it finish and do not install random “virus cleaner” programs from popups.
7. Tell me what Defender reports.`,
ru:`Чтобы проверить ПК через Microsoft Defender:
1. Открой Пуск и найди «Безопасность Windows».
2. Открой «Защита от вирусов и угроз».
3. Сначала запусти «Быструю проверку».
4. Если есть подозрение на вирус или что-то найдено — открой «Параметры сканирования».
5. Выбери «Полная проверка».
6. Дождись окончания и не устанавливай случайные «очистители вирусов» из всплывающей рекламы.
7. Напиши, что сообщил Defender.`,
fi:`Microsoft Defender -tarkistus:
1. Avaa Käynnistä ja etsi Windows Security.
2. Avaa Virus & threat protection.
3. Suorita ensin Quick scan.
4. Jos epäilet haittaohjelmaa tai jotain löytyy, avaa Scan options.
5. Valitse Full scan.
6. Anna tarkistuksen valmistua äläkä asenna satunnaisia “virus cleaner” -ohjelmia ponnahdusikkunoista.
7. Kerro mitä Defender ilmoitti.`
}
};

V11.genericHow = function(l){
  const ll=getLang(l);
  return {
    en:`I can explain it step by step, but I need to know which previous step you mean. Tell me the exact thing you want to do — for example “how do I change DNS?”, “how do I check my ISP?”, or “how do I restart the router?”`,
    ru:`Я могу объяснить пошагово, но нужно понять, какой именно предыдущий пункт ты имеешь в виду. Напиши конкретно, например: «как поменять DNS?», «как проверить провайдера?» или «как перезагрузить роутер?»`,
    fi:`Voin selittää sen vaihe vaiheelta, mutta minun pitää tietää mitä edellistä kohtaa tarkoitat. Kirjoita esimerkiksi “miten vaihdan DNS:n?”, “miten tarkistan operaattorin?” tai “miten käynnistän reitittimen uudelleen?”`
  }[ll];
};

V11.handle = function(text,l){
  const ll=detectLangFromText(text,l);
  V11.lastUserLanguage=ll;
  V11.lastUserText=clean(text);

  // Remember topic from every substantive user message BEFORE older layers answer.
  const topic=V11.detectTopic(text);
  if(topic) V11.lastTopic=topic;

  // Some phrases imply a specific action even without naming the topic again.
  const t=clean(text);
  if(hasPhrase(t,"restart the router") || hasPhrase(t,"перезагрузить роутер") || hasPhrase(t,"käynnistä reititin uudelleen"))
    V11.lastTopic="router_restart";
  if(hasPhrase(t,"clear cache") || hasPhrase(t,"очистить кэш") || hasPhrase(t,"tyhjennä välimuisti"))
    V11.lastTopic="browser_cache";

  if(V11.isHowFollowup(text)){
    const key=V11.lastTopic;
    if(key && STEPS[key]){
      V11.lastAction="guided_"+key;
      return {type:"answer",text:STEPS[key][ll] || STEPS[key].en};
    }
    return {type:"answer",text:V11.genericHow(ll)};
  }

  return null;
};

window.ANITA_V11=V11;

// Wrap the current V7 pipeline so v11 gets first chance before v10/v9/v8.
if(window.ANITA_V7 && typeof window.ANITA_V7.handle==="function"){
  const previous=window.ANITA_V7.handle.bind(window.ANITA_V7);
  window.ANITA_V7.handle=function(text,l){
    const r=V11.handle(text,l);
    if(r) return r;
    return previous(text,l);
  };
}

window.anitaGuidedFollowup = V11.handle;
console.log("[ANITA v11] Guided Follow-Up Engine loaded");
})();

/* ================= ANITA v12 CONVERSATION CORE =================
   Multilingual conversational IT-support state engine for RU / EN / FI.
   Works on top of ANITA v11 and preserves the existing knowledge layers.

   Goals:
   - remember the current problem and diagnostic branch
   - understand short replies: yes/no/done/still broken/how/why/back/continue
   - keep context even when the user changes language
   - guide one step at a time instead of dumping a generic checklist
   - explain WHY a step is being done
   - resume troubleshooting after a side question
   - avoid repeating the same answer
   - keep deterministic behavior; no generative AI
   ===================================================================== */
(function(){
"use strict";

const C = {};
C.version = "12.0";

C.state = {
  issue: null,
  branch: null,
  step: null,
  language: "en",
  device: "computer",
  os: "windows",
  app: null,
  lastQuestion: null,
  lastInstruction: null,
  lastAnswer: null,
  completed: [],
  failed: [],
  facts: {},
  pausedForDefinition: false,
  resumeStep: null,
  history: []
};

const S = C.state;

const clean = s => (s || "")
  .toLowerCase()
  .replace(/[’`]/g, "'")
  .replace(/[?!.,:;()[\]{}"“”]/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const words = s => clean(s).split(/\s+/).filter(Boolean);
const has = (s, p) => (" " + clean(s) + " ").includes(" " + clean(p) + " ");
const any = (s, arr) => arr.some(p => has(s,p));

function langOf(text, fallback){
  const t = clean(text);
  if(/[а-яё]/i.test(text)) return "ru";
  if(/[äöå]/i.test(text) || any(t,[
    "miten","miksi","kyllä","ei","valmis","jatka","takaisin","tietokone","selain",
    "verkko","netti","reititin","tulostin","ääni","näyttö","bluetooth","päivitys"
  ])) return "fi";
  if(/[a-z]/i.test(text)) return "en";
  return fallback || S.language || "en";
}

function T(en,ru,fi,l){
  return ({en,ru,fi})[l || S.language] || en;
}

function rememberHistory(role,text){
  S.history.push({role,text:String(text||""),time:Date.now()});
  if(S.history.length > 30) S.history.shift();
}

function resetIssue(){
  S.issue=null; S.branch=null; S.step=null; S.app=null;
  S.lastQuestion=null; S.lastInstruction=null; S.lastAnswer=null;
  S.completed=[]; S.failed=[]; S.facts={};
  S.pausedForDefinition=false; S.resumeStep=null;
}

function setIssue(issue, step){
  if(S.issue !== issue){
    resetIssue();
    S.issue = issue;
  }
  if(step) S.step = step;
}

function markDone(name){
  if(name && !S.completed.includes(name)) S.completed.push(name);
}
function markFailed(name){
  if(name && !S.failed.includes(name)) S.failed.push(name);
}

function answer(text, meta={}){
  S.lastAnswer = text;
  if(meta.question) S.lastQuestion = meta.question;
  if(meta.instruction) S.lastInstruction = meta.instruction;
  rememberHistory("assistant", text);
  return {type:"answer", text};
}

function q(text, id){
  S.lastQuestion=id || null;
  return answer(text,{question:id});
}

function instr(text, id){
  S.lastInstruction=id || null;
  return answer(text,{instruction:id});
}

const RX = {
  yes: [
    "yes","yeah","yep","yup","it does","works","working","correct","right","sure",
    "да","ага","угу","работает","есть","подключен","подключён","вижу","получилось",
    "kyllä","joo","toimii","on","näkyy","onnistui"
  ],
  no: [
    "no","nope","nah","doesn't","doesnt","not working","not","can't","cant",
    "нет","неа","не работает","не вижу","не получилось","не подключен","не подключён",
    "ei","eip","ei toimi","en näe","ei onnistunut"
  ],
  done: [
    "done","did it","finished","ready","completed","ok done","okay done",
    "готово","сделал","сделала","выполнил","выполнила","сделано","готов",
    "valmis","tehty","tein sen","onnistui"
  ],
  still: [
    "still doesn't work","still doesnt work","still broken","same","same problem",
    "nothing changed","didn't help","didnt help","not fixed","still not working",
    "всё ещё не работает","все еще не работает","не помогло","ничего не изменилось",
    "та же проблема","так же","всё так же","все так же",
    "ei vieläkään toimi","ei auttanut","sama ongelma","mikään ei muuttunut"
  ],
  why: [
    "why","why this","why do this","what for","what is this for",
    "почему","зачем","для чего","а зачем","почему это",
    "miksi","miksi tämä","mihin tätä tarvitaan"
  ],
  how: [
    "how","how do i do that","how do i do this","how exactly","show me how",
    "как","как это сделать","как сделать","как именно","покажи как",
    "miten","miten teen sen","miten tämä tehdään","näytä miten"
  ],
  back: [
    "back","go back","previous","previous step","undo","return",
    "назад","вернись","предыдущий шаг","отмена","вернуть",
    "takaisin","edellinen","peruuta"
  ],
  continue: [
    "continue","next","go on","okay continue","ok continue","what next","then what",
    "продолжай","дальше","что дальше","следующий","ок продолжай",
    "jatka","seuraava","mitä seuraavaksi"
  ]
};

function kind(text){
  const t=clean(text);
  const w=words(t);
  const short=w.length <= 7;
  for(const [k,arr] of Object.entries(RX)){
    if(arr.some(p => t === clean(p))) return k;
    if(short && arr.some(p => has(t,p))) return k;
  }
  return "other";
}

function detectIssue(text){
  const t=clean(text);

  if(any(t,["dns","domain name system","днс","dns сервер","dns-сервер"])) return "dns";
  if(any(t,["isp","internet service provider","провайдер","интернет провайдер","operaattori"])) return "isp";

  if(any(t,[
    "internet not working","internet doesn't work","internet doesnt work","no internet",
    "нет интернета","интернет не работает","пропал интернет",
    "netti ei toimi","internet ei toimi","ei internetiä"
  ])) return "internet";

  if(any(t,[
    "wifi not working","wi fi not working","can't connect to wifi","cant connect to wifi",
    "wifi не работает","wi fi не работает","не подключается к wifi","не подключается к wi fi",
    "wifi ei toimi","wi fi ei toimi","ei yhdistä wifiin"
  ])) return "wifi";

  if(any(t,[
    "browser","chrome","edge","firefox","website","websites","page","pages",
    "браузер","хром","эдж","firefox","сайт","сайты","страница","страницы",
    "selain","chrome","edge","firefox","sivu","sivut","verkkosivu"
  ]) && any(t,[
    "not load","doesn't load","doesnt load","won't load","wont load","blank","stops","slow",
    "не груз","не откры","белый экран","завис","медленно",
    "ei lata","ei avaudu","tyhjä","hidas"
  ])) return "browser";

  if(any(t,[
    "pc slow","computer slow","windows slow","slow computer","laggy","sluggish",
    "компьютер тормозит","комп тормозит","windows тормозит","медленно работает","лагает",
    "tietokone hidas","windows hidas","kone hidas","lagaa"
  ])) return "slow_pc";

  if(any(t,[
    "printer","принтер","tulostin"
  ]) && any(t,[
    "not working","doesn't print","doesnt print","offline","not printing",
    "не работает","не печатает","офлайн",
    "ei toimi","ei tulosta","offline"
  ])) return "printer";

  if(any(t,[
    "no sound","sound not working","audio not working","can't hear","cant hear",
    "нет звука","звук не работает","не слышно",
    "ei ääntä","ääni ei toimi"
  ])) return "sound";

  if(any(t,[
    "monitor not working","display not working","black screen","second monitor","no signal",
    "монитор не работает","черный экран","чёрный экран","нет сигнала","второй монитор",
    "näyttö ei toimi","musta ruutu","ei signaalia","toinen näyttö"
  ])) return "display";

  if(any(t,["bluetooth"]) && any(t,[
    "not working","can't connect","cant connect","not connecting",
    "не работает","не подключается",
    "ei toimi","ei yhdistä"
  ])) return "bluetooth";

  if(any(t,[
    "windows update problem","update failed","windows update failed","can't update",
    "ошибка обновления","windows update не работает","не обновляется",
    "windows update ei toimi","päivitys epäonnistui"
  ])) return "windows_update_problem";

  if(any(t,[
    "virus","malware","trojan","ransomware","spyware","infected",
    "вирус","троян","вредонос","заражен","заражён",
    "haittaohjelma","virus","troijalainen"
  ])) return "malware";

  if(any(t,[
    "app crashes","program crashes","application crashes","program not opening","app not opening",
    "программа вылетает","программа не открывается","приложение вылетает","не запускается",
    "ohjelma kaatuu","sovellus kaatuu","ohjelma ei avaudu"
  ])) return "app_crash";

  return null;
}

function whyForCurrent(l){
  const map = {
    internet_device_test: T(
      "This tells us whether the problem affects only this computer or the whole network. If another device works, the router and ISP are less likely to be the cause.",
      "Это помогает понять, проблема только на этом компьютере или во всей сети. Если другое устройство работает, роутер и провайдер с меньшей вероятностью являются причиной.",
      "Tämä kertoo, koskeeko ongelma vain tätä tietokonetta vai koko verkkoa. Jos toinen laite toimii, reititin ja operaattori ovat epätodennäköisempi syy.",
      l
    ),
    internet_wifi_state: T(
      "We need to separate a Wi-Fi connection problem from an Internet-access problem. Those are diagnosed differently.",
      "Нужно отделить проблему подключения к Wi‑Fi от проблемы доступа в интернет. Это две разные ветки диагностики.",
      "Meidän pitää erottaa Wi‑Fi-yhteysongelma internet-yhteysongelmasta. Ne tutkitaan eri tavalla.",
      l
    ),
    dns_flush: T(
      "Flushing DNS removes cached name-resolution entries. If a cached DNS record is corrupted or stale, this can fix websites that fail by name without changing your files or Wi-Fi password.",
      "Очистка DNS удаляет сохранённые записи разрешения имён. Если запись устарела или повреждена, сайты могут снова начать открываться. Это не удаляет файлы и не меняет пароль Wi‑Fi.",
      "DNS-välimuistin tyhjennys poistaa tallennetut nimenselvitystiedot. Vanhentunut tai vioittunut merkintä voi estää sivujen avautumisen. Tämä ei poista tiedostoja eikä muuta Wi‑Fi-salasanaa.",
      l
    ),
    browser_private: T(
      "A private window uses a cleaner browser session. If the site works there, cache, cookies, or an extension is more likely than Windows networking.",
      "Приватное окно запускает более чистую сессию браузера. Если сайт там работает, вероятнее проблема в кэше, cookies или расширении, а не в сети Windows.",
      "Yksityinen ikkuna käyttää puhtaampaa selainistuntoa. Jos sivu toimii siellä, välimuisti, eväste tai laajennus on todennäköisempi syy kuin Windowsin verkko.",
      l
    ),
    slow_task_manager: T(
      "Task Manager shows whether CPU, memory, or disk usage is unusually high. That helps us avoid guessing what makes the PC slow.",
      "Диспетчер задач показывает, есть ли высокая нагрузка на процессор, память или диск. Так мы не будем гадать, из-за чего тормозит ПК.",
      "Tehtävienhallinta näyttää, onko CPU-, muisti- tai levynkuormitus poikkeuksellisen suuri. Näin emme arvaa syytä.",
      l
    ),
    printer_queue: T(
      "A stuck print job can block every job behind it. Clearing or inspecting the queue is a safe first check before reinstalling drivers.",
      "Зависшее задание печати может блокировать все следующие. Проверка очереди — безопасный первый шаг до переустановки драйверов.",
      "Jumiutunut tulostustyö voi estää kaikki seuraavat työt. Tulostusjonon tarkistus on turvallinen ensimmäinen askel ennen ajureita.",
      l
    )
  };
  return map[S.lastInstruction] || map[S.lastQuestion] || T(
    "That step helps narrow down the cause instead of changing random settings. If you tell me which step you mean, I can explain it more precisely.",
    "Этот шаг нужен, чтобы сузить причину проблемы, а не менять настройки наугад. Если скажешь, какой именно шаг имеешь в виду, я объясню точнее.",
    "Tämän vaiheen tarkoitus on rajata syytä ilman satunnaisten asetusten muuttamista. Jos kerrot mitä vaihetta tarkoitat, selitän tarkemmin.",
    l
  );
}

function repeatHow(l){
  if(S.lastInstruction){
    const guide = instructionText(S.lastInstruction,l);
    if(guide) return guide;
  }
  return T(
    "Tell me which step you want me to show in more detail, and I will give you the exact clicks/keys.",
    "Скажи, какой именно шаг показать подробнее, и я дам точные кнопки и действия.",
    "Kerro mikä vaihe pitää näyttää tarkemmin, niin annan tarkat painikkeet ja valinnat.",
    l
  );
}

function instructionText(id,l){
  const m = {
    dns_flush: T(
`Do this exactly:
1. Press the Windows key.
2. Type cmd.
3. Right-click Command Prompt → Run as administrator.
4. Type: ipconfig /flushdns
5. Press Enter.
6. When you see the success message, close the browser completely and reopen it.
Tell me “done” when you have done that.`,
`Сделай точно так:
1. Нажми клавишу Windows.
2. Напиши cmd.
3. Правой кнопкой по «Командная строка» → «Запуск от имени администратора».
4. Введи: ipconfig /flushdns
5. Нажми Enter.
6. Когда увидишь сообщение об успешной очистке, полностью закрой браузер и открой снова.
Напиши «готово», когда сделаешь.`,
`Tee näin:
1. Paina Windows-näppäintä.
2. Kirjoita cmd.
3. Napsauta Komentokehotetta oikealla → Suorita järjestelmänvalvojana.
4. Kirjoita: ipconfig /flushdns
5. Paina Enter.
6. Kun onnistumisviesti näkyy, sulje selain kokonaan ja avaa se uudelleen.
Kirjoita “valmis”, kun olet tehnyt tämän.`,l),
    browser_private: T(
`Open a private browser window:
• Chrome / Edge: press Ctrl + Shift + N
• Firefox: press Ctrl + Shift + P
Then open the same website there.
Tell me whether the page loads: yes or no.`,
`Открой приватное окно браузера:
• Chrome / Edge: Ctrl + Shift + N
• Firefox: Ctrl + Shift + P
Затем открой там тот же сайт.
Напиши, загрузился сайт: да или нет.`,
`Avaa yksityinen selainikkuna:
• Chrome / Edge: Ctrl + Shift + N
• Firefox: Ctrl + Shift + P
Avaa sitten sama verkkosivu.
Kerro latautuuko sivu: kyllä vai ei.`,l),
    slow_task_manager: T(
`Press Ctrl + Shift + Esc to open Task Manager.
Then look at CPU, Memory and Disk.
Tell me which one is highest and approximately what percentage you see.`,
`Нажми Ctrl + Shift + Esc, чтобы открыть Диспетчер задач.
Посмотри на ЦП/CPU, Память и Диск.
Напиши, что из них загружено сильнее всего и примерно на сколько процентов.`,
`Paina Ctrl + Shift + Esc avataksesi Tehtävienhallinnan.
Katso CPU, Memory ja Disk.
Kerro mikä niistä on korkein ja suunnilleen kuinka monta prosenttia.`,l),
    printer_queue: T(
`Open the print queue:
1. Press Windows + I.
2. Open Bluetooth & devices → Printers & scanners.
3. Select your printer.
4. Open print queue.
Tell me whether you see a document stuck there.`,
`Открой очередь печати:
1. Нажми Windows + I.
2. «Bluetooth и устройства» → «Принтеры и сканеры».
3. Выбери свой принтер.
4. Открой очередь печати.
Напиши, есть ли там зависшее задание.`,
`Avaa tulostusjono:
1. Paina Windows + I.
2. Bluetooth & devices → Printers & scanners.
3. Valitse tulostin.
4. Avaa tulostusjono.
Kerro näkyykö siellä jumiutunut työ.`,l),
    sound_output: T(
`Check the selected sound output:
1. Click the speaker icon near the clock.
2. Click the output-device selector next to the volume control.
3. Choose the speakers/headphones you are actually using.
4. Set volume to about 50%.
Tell me whether sound returns.`,
`Проверь устройство вывода звука:
1. Нажми значок динамика возле часов.
2. Открой выбор устройства вывода рядом с громкостью.
3. Выбери колонки/наушники, которыми реально пользуешься.
4. Поставь громкость примерно 50%.
Напиши, появился ли звук.`,
`Tarkista äänilähtö:
1. Napsauta kaiutinkuvaketta kellon lähellä.
2. Avaa äänen ulostulolaitteen valinta.
3. Valitse käyttämäsi kaiuttimet/kuulokkeet.
4. Aseta äänenvoimakkuus noin 50 %:iin.
Kerro palaako ääni.`,l),
    display_detect: T(
`Press Windows + P.
Choose “Extend” if you use a second monitor.
If nothing appears, open Settings → System → Display and click Detect.
Tell me whether Windows finds the monitor.`,
`Нажми Windows + P.
Если используешь второй монитор, выбери «Расширить».
Если ничего не появилось: Параметры → Система → Дисплей → «Обнаружить».
Напиши, видит ли Windows монитор.`,
`Paina Windows + P.
Jos käytät toista näyttöä, valitse Extend.
Jos mitään ei näy: Settings → System → Display → Detect.
Kerro löytääkö Windows näytön.`,l),
    bluetooth_toggle: T(
`Press Windows + I → Bluetooth & devices.
Turn Bluetooth off, wait 10 seconds, then turn it back on.
Put the accessory into pairing mode and try Add device again.
Tell me whether the device appears in the list.`,
`Нажми Windows + I → «Bluetooth и устройства».
Выключи Bluetooth, подожди 10 секунд и включи снова.
Переведи устройство в режим сопряжения и снова нажми «Добавить устройство».
Напиши, появляется ли оно в списке.`,
`Paina Windows + I → Bluetooth & devices.
Sammuta Bluetooth, odota 10 sekuntia ja käynnistä se uudelleen.
Aseta lisälaite pariliitostilaan ja valitse Add device.
Kerro näkyykö laite listassa.`,l),
    defender_scan: T(
`Open Windows Security → Virus & threat protection → Quick scan.
Let it finish.
Tell me whether Defender found anything.`,
`Открой «Безопасность Windows» → «Защита от вирусов и угроз» → «Быстрая проверка».
Дождись окончания.
Напиши, нашёл ли Defender что-нибудь.`,
`Avaa Windows Security → Virus & threat protection → Quick scan.
Anna tarkistuksen valmistua.
Kerro löytyikö mitään.`,l)
  };
  return m[id] || null;
}

/* ---------- Internet conversation ---------- */
function internetStart(l){
  setIssue("internet","internet_wifi_state");
  return q(T(
    "Let's diagnose it step by step. Is Wi‑Fi connected on this computer right now, or can the computer not connect to Wi‑Fi at all? You can answer “connected” or “not connected”.",
    "Давай проверим по шагам. Wi‑Fi на этом компьютере сейчас подключён, или компьютер вообще не может подключиться к Wi‑Fi? Можно ответить «подключён» или «не подключён».",
    "Tutkitaan vaihe vaiheelta. Onko Wi‑Fi tällä tietokoneella nyt yhdistetty, vai eikö tietokone saa Wi‑Fi-yhteyttä lainkaan? Voit vastata “yhdistetty” tai “ei yhdistetty”.",
    l),"internet_wifi_state");
}

function internetFlow(text,k,l){
  const t=clean(text);

  if(S.step==="internet_wifi_state"){
    if(any(t,["connected","подключен","подключён","yhdistetty","wifi is connected","wi fi is connected"]) || k==="yes"){
      S.facts.wifiConnected=true;
      S.step="internet_device_test";
      return q(T(
        "Good. Now check another device on the same Wi‑Fi, for example your phone. Does the Internet work there?",
        "Хорошо. Теперь проверь другое устройство в той же Wi‑Fi сети, например телефон. Интернет на нём работает?",
        "Hyvä. Tarkista nyt toinen laite samassa Wi‑Fi-verkossa, esimerkiksi puhelin. Toimiiko internet siinä?",
        l),"internet_device_test");
    }
    if(any(t,["not connected","can't connect","cant connect","не подключен","не подключён","не подключается","ei yhdistetty","ei yhdistä"]) || k==="no"){
      S.facts.wifiConnected=false;
      S.issue="wifi"; S.step="wifi_visible";
      return q(T(
        "Understood. Do you see your Wi‑Fi network name in the list of available networks?",
        "Понял. Ты видишь название своей Wi‑Fi сети в списке доступных сетей?",
        "Selvä. Näkyykö oman Wi‑Fi-verkkosi nimi saatavilla olevien verkkojen listassa?",
        l),"wifi_visible");
    }
  }

  if(S.step==="internet_device_test"){
    if(k==="yes"){
      S.facts.otherDeviceWorks=true;
      S.step="internet_browser_scope";
      return q(T(
        "That means the Internet connection itself is probably working and the problem is local to this computer. Do ALL websites fail here, or only one particular website?",
        "Это значит, что само интернет-соединение, скорее всего, работает, а проблема находится на этом компьютере. Здесь не открываются ВСЕ сайты или только один конкретный сайт?",
        "Tämä tarkoittaa, että internet-yhteys itsessään todennäköisesti toimii ja ongelma on tässä tietokoneessa. Eivätkö KAIKKI sivut avaudu vai vain yksi tietty sivu?",
        l),"internet_browser_scope");
    }
    if(k==="no"){
      S.facts.otherDeviceWorks=false;
      S.step="internet_router_restart";
      S.lastInstruction="router_restart";
      return instr(T(
        "If two devices are offline, let's test the router first. Do NOT press the RESET button. Unplug the router's power cable for about 30 seconds, plug it back in, then wait 3–5 minutes. Tell me “done” when it has restarted.",
        "Если интернета нет на двух устройствах, сначала проверим роутер. НЕ нажимай RESET. Отключи питание роутера примерно на 30 секунд, включи обратно и подожди 3–5 минут. Напиши «готово», когда он перезапустится.",
        "Jos kahdella laitteella ei ole internetiä, testataan ensin reititin. ÄLÄ paina RESET-painiketta. Irrota virtajohto noin 30 sekunniksi, kytke takaisin ja odota 3–5 minuuttia. Kirjoita “valmis”, kun se on käynnistynyt.",
        l),"router_restart");
    }
  }

  if(S.step==="internet_router_restart"){
    if(k==="done" || k==="continue" || k==="yes"){
      markDone("router_restart");
      S.step="internet_after_router";
      return q(T(
        "Now test the Internet on both the computer and the other device. Does it work on either of them?",
        "Теперь проверь интернет и на компьютере, и на другом устройстве. Он заработал хотя бы на одном из них?",
        "Testaa nyt internet sekä tietokoneella että toisella laitteella. Toimiiko se kummallakaan?",
        l),"internet_after_router");
    }
  }

  if(S.step==="internet_after_router"){
    if(k==="yes"){
      return finish(T(
        "Good — the router restart restored the connection. If the problem returns often, the router, line, or ISP may need a closer check.",
        "Хорошо — перезапуск роутера восстановил соединение. Если проблема часто повторяется, стоит отдельно проверить роутер, линию или провайдера.",
        "Hyvä — reitittimen uudelleenkäynnistys palautti yhteyden. Jos ongelma toistuu usein, reititin, yhteys tai operaattori kannattaa tarkistaa tarkemmin.",
        l));
    }
    if(k==="no" || k==="still"){
      S.issue="isp"; S.step="isp_status";
      return q(T(
        "Because multiple devices are still offline after a router restart, the ISP/line is now a strong possibility. Using mobile data on your phone, can you check your ISP's outage/service-status page?",
        "Поскольку после перезапуска роутера интернета всё ещё нет на нескольких устройствах, вероятна проблема у провайдера или на линии. Можешь через мобильный интернет на телефоне проверить страницу аварий/статуса своего провайдера?",
        "Koska useat laitteet ovat edelleen ilman internetiä reitittimen uudelleenkäynnistyksen jälkeen, operaattori/yhteys on nyt vahva epäily. Voitko tarkistaa puhelimen mobiilidatalla operaattorin häiriö-/palvelutilasivun?",
        l),"isp_status");
    }
  }

  if(S.step==="internet_browser_scope"){
    if(any(t,["all","all websites","every site","все","все сайты","kaikki","kaikki sivut"])){
      S.facts.allSites=true;
      S.step="dns_flush";
      S.lastInstruction="dns_flush";
      return instr(instructionText("dns_flush",l),"dns_flush");
    }
    if(any(t,["one","one website","only one","один","только один","yksi","vain yksi"])){
      S.facts.allSites=false;
      S.issue="browser"; S.step="browser_private";
      S.lastInstruction="browser_private";
      return instr(T(
        "If only one site fails, first test that same site in a private/incognito window. " + instructionText("browser_private",l),
        "Если не открывается только один сайт, сначала проверь его в приватном/инкогнито окне.\n" + instructionText("browser_private",l),
        "Jos vain yksi sivu ei avaudu, testaa sama sivu ensin yksityisessä/incognito-ikkunassa.\n" + instructionText("browser_private",l),
        l),"browser_private");
    }
  }

  if(S.step==="dns_flush"){
    if(k==="done" || k==="continue"){
      markDone("dns_flush");
      S.step="dns_result";
      return q(T(
        "Now try opening two or three websites. Do they load normally?",
        "Теперь попробуй открыть два-три сайта. Они загружаются нормально?",
        "Kokeile nyt avata kaksi tai kolme verkkosivua. Latautuvatko ne normaalisti?",
        l),"dns_result");
    }
  }

  if(S.step==="dns_result"){
    if(k==="yes"){
      return finish(T(
        "Great. The DNS cache was likely stale or corrupted, and flushing it fixed the issue.",
        "Отлично. Скорее всего, DNS-кэш был устаревшим или повреждённым, и очистка решила проблему.",
        "Hyvä. DNS-välimuisti oli todennäköisesti vanhentunut tai vioittunut, ja tyhjennys korjasi ongelman.",
        l));
    }
    if(k==="no" || k==="still"){
      S.step="dns_change";
      return instr(T(
`Then let's test a different DNS resolver:
1. Press Windows + R.
2. Type ncpa.cpl → Enter.
3. Right-click the active Wi‑Fi/Ethernet adapter → Properties.
4. Double-click Internet Protocol Version 4 (TCP/IPv4).
5. Choose “Use the following DNS server addresses”.
6. Preferred DNS: 1.1.1.1
7. Alternate DNS: 1.0.0.1
8. Press OK and test the browser again.
Tell me whether anything changes.`,
`Тогда проверим другой DNS:
1. Нажми Windows + R.
2. Введи ncpa.cpl → Enter.
3. Правой кнопкой по активному Wi‑Fi/Ethernet → «Свойства».
4. Дважды нажми «IP версии 4 (TCP/IPv4)».
5. Выбери «Использовать следующие адреса DNS-серверов».
6. Предпочитаемый DNS: 1.1.1.1
7. Альтернативный DNS: 1.0.0.1
8. Нажми OK и снова проверь браузер.
Напиши, изменилось ли что-нибудь.`,
`Testataan sitten toista DNS-palvelinta:
1. Paina Windows + R.
2. Kirjoita ncpa.cpl → Enter.
3. Napsauta aktiivista Wi‑Fi/Ethernet-sovitinta oikealla → Properties.
4. Avaa Internet Protocol Version 4 (TCP/IPv4).
5. Valitse “Use the following DNS server addresses”.
6. Preferred DNS: 1.1.1.1
7. Alternate DNS: 1.0.0.1
8. Paina OK ja testaa selainta.
Kerro muuttuiko tilanne.`,l),"dns_change");
    }
  }
}

/* ---------- Wi-Fi branch ---------- */
function wifiStart(l){
  setIssue("wifi","wifi_visible");
  return q(T(
    "Do you see your Wi‑Fi network name in the list of available networks?",
    "Ты видишь название своей Wi‑Fi сети в списке доступных сетей?",
    "Näkyykö oman Wi‑Fi-verkkosi nimi saatavilla olevien verkkojen listassa?",
    l),"wifi_visible");
}
function wifiFlow(text,k,l){
  if(S.step==="wifi_visible"){
    if(k==="yes"){
      S.step="wifi_connect_error";
      return q(T(
        "When you click it and choose Connect, what happens: does it ask for the password, say “Can't connect to this network”, or connect with “No Internet”?",
        "Когда нажимаешь на сеть и «Подключиться», что происходит: просит пароль, пишет «Не удаётся подключиться к этой сети» или подключается, но пишет «Без доступа к Интернету»?",
        "Kun valitset verkon ja Yhdistä, mitä tapahtuu: pyytääkö se salasanaa, näyttääkö “Can't connect to this network” vai yhdistääkö se mutta näyttää “No Internet”?",
        l),"wifi_connect_error");
    }
    if(k==="no"){
      S.step="wifi_toggle";
      return instr(T(
        "Turn Wi‑Fi off, wait 10 seconds, and turn it back on. Then look at the network list again. Tell me whether your network appears.",
        "Выключи Wi‑Fi, подожди 10 секунд и включи снова. Затем снова открой список сетей. Напиши, появилась ли твоя сеть.",
        "Sammuta Wi‑Fi, odota 10 sekuntia ja käynnistä se uudelleen. Katso sitten verkkolista uudelleen. Kerro näkyykö oma verkkosi.",
        l),"wifi_toggle");
    }
  }
  if(S.step==="wifi_toggle" && (k==="done" || k==="continue" || k==="yes" || k==="no")){
    if(k==="yes"){
      S.step="wifi_visible";
      return q(T("Good. Can you connect to it now?","Хорошо. Теперь получается подключиться?","Hyvä. Pystytkö yhdistämään siihen nyt?",l),"wifi_connect_now");
    }
    S.step="wifi_adapter";
    return instr(T(
`Let's check the Wi‑Fi adapter:
1. Right-click Start → Device Manager.
2. Open Network adapters.
3. Look for a Wireless / Wi‑Fi adapter.
Tell me whether you see it and whether it has a yellow warning icon.`,
`Проверим Wi‑Fi адаптер:
1. Правой кнопкой по Пуск → «Диспетчер устройств».
2. Открой «Сетевые адаптеры».
3. Найди Wireless / Wi‑Fi адаптер.
Напиши, видишь ли его и есть ли возле него жёлтый значок предупреждения.`,
`Tarkistetaan Wi‑Fi-sovitin:
1. Napsauta Käynnistä oikealla → Laitehallinta.
2. Avaa Verkkosovittimet.
3. Etsi Wireless / Wi‑Fi -sovitin.
Kerro näkyykö se ja onko siinä keltainen varoitusmerkki.`,l),"wifi_adapter");
  }
}

/* ---------- Browser branch ---------- */
function browserStart(l){
  setIssue("browser","browser_private");
  S.lastInstruction="browser_private";
  return instr(instructionText("browser_private",l),"browser_private");
}
function browserFlow(text,k,l){
  if(S.step==="browser_private"){
    if(k==="yes"){
      S.step="browser_cache";
      return instr(T(
`Good — that points to browser data or an extension.
Next:
1. In Chrome/Edge press Ctrl + Shift + Delete.
2. Select Cached images and files.
3. You do not need to delete saved passwords.
4. Clear the cache.
5. Restart the browser.
Tell me “done” when finished.`,
`Хорошо — это указывает на данные браузера или расширение.
Дальше:
1. В Chrome/Edge нажми Ctrl + Shift + Delete.
2. Выбери «Кэшированные изображения и файлы».
3. Сохранённые пароли удалять не нужно.
4. Очисти кэш.
5. Перезапусти браузер.
Напиши «готово».`,
`Hyvä — tämä viittaa selaimen tietoihin tai laajennukseen.
Seuraavaksi:
1. Chromessa/Edgessä paina Ctrl + Shift + Delete.
2. Valitse Cached images and files.
3. Tallennettuja salasanoja ei tarvitse poistaa.
4. Tyhjennä välimuisti.
5. Käynnistä selain uudelleen.
Kirjoita “valmis”.`,l),"browser_cache");
    }
    if(k==="no"){
      S.step="browser_other_browser";
      return q(T(
        "Does the same website fail in another browser too, for example Edge if you normally use Chrome?",
        "Тот же сайт не открывается и в другом браузере, например Edge, если обычно используешь Chrome?",
        "Eikö sama sivu avaudu myöskään toisessa selaimessa, esimerkiksi Edgessä jos käytät yleensä Chromea?",
        l),"browser_other_browser");
    }
  }
  if(S.step==="browser_cache" && (k==="done" || k==="continue")){
    S.step="browser_cache_result";
    return q(T("Test the site again. Does it work now?","Проверь сайт снова. Теперь работает?","Testaa sivua uudelleen. Toimiiko se nyt?",l),"browser_cache_result");
  }
  if(S.step==="browser_cache_result"){
    if(k==="yes") return finish(T("Great — the browser cache was the likely cause.","Отлично — вероятной причиной был кэш браузера.","Hyvä — selaimen välimuisti oli todennäköinen syy.",l));
    if(k==="no" || k==="still"){
      S.step="browser_extensions";
      return instr(T(
        "Next, temporarily disable browser extensions one by one, especially ad blockers, VPN extensions, security extensions, and script blockers. Test the page after each change. Tell me if one of them makes the page work.",
        "Теперь временно отключай расширения браузера по одному, особенно блокировщики рекламы, VPN, защитные расширения и script blocker. После каждого отключения проверяй сайт. Напиши, если после какого-то расширения сайт заработает.",
        "Poista seuraavaksi selaimen laajennuksia väliaikaisesti käytöstä yksi kerrallaan, erityisesti mainosesto-, VPN-, tietoturva- ja script blocker -laajennukset. Testaa sivu jokaisen muutoksen jälkeen. Kerro jos jokin niistä korjaa ongelman.",
        l),"browser_extensions");
    }
  }
  if(S.step==="browser_other_browser"){
    if(k==="yes"){
      S.issue="internet"; S.step="dns_flush"; S.lastInstruction="dns_flush";
      return instr(T(
        "Because the problem happens in more than one browser, let's check Windows networking/DNS rather than only browser settings.\n\n"+instructionText("dns_flush",l),
        "Поскольку проблема повторяется в нескольких браузерах, проверим сеть/DNS Windows, а не только настройки браузера.\n\n"+instructionText("dns_flush",l),
        "Koska ongelma esiintyy useammassa selaimessa, tarkistetaan Windowsin verkko/DNS eikä vain selaimen asetuksia.\n\n"+instructionText("dns_flush",l),
        l),"dns_flush");
    }
    if(k==="no"){
      return q(T(
        "Then the problem is specific to the original browser. Which browser is it: Chrome, Edge, Firefox, or something else?",
        "Тогда проблема относится именно к исходному браузеру. Какой это браузер: Chrome, Edge, Firefox или другой?",
        "Silloin ongelma koskee vain alkuperäistä selainta. Mikä selain se on: Chrome, Edge, Firefox vai jokin muu?",
        l),"browser_name");
    }
  }
}

/* ---------- Slow PC ---------- */
function slowStart(l){
  setIssue("slow_pc","slow_task_manager");
  S.lastInstruction="slow_task_manager";
  return instr(T(
    "Let's first see what resource is actually under load instead of guessing.\n\n"+instructionText("slow_task_manager",l),
    "Сначала посмотрим, какой ресурс реально перегружен, чтобы не гадать.\n\n"+instructionText("slow_task_manager",l),
    "Katsotaan ensin mikä resurssi on oikeasti kuormitettu, jotta emme arvaa.\n\n"+instructionText("slow_task_manager",l),
    l),"slow_task_manager");
}
function slowFlow(text,k,l){
  const t=clean(text);
  if(S.step==="slow_task_manager"){
    if(any(t,["cpu","processor","процессор","цп"]) && any(t,["100","90","80","high","высок","korkea"])){
      S.facts.high="cpu"; S.step="slow_top_process";
      return q(T(
        "CPU is high. In Task Manager, click the CPU column to sort highest first. What program/process is at the top?",
        "Высокая загрузка CPU. В Диспетчере задач нажми столбец ЦП/CPU, чтобы отсортировать по убыванию. Какая программа или процесс стоит первой?",
        "CPU-kuormitus on korkea. Napsauta Tehtävienhallinnassa CPU-saraketta lajitellaksesi suurimmasta pienimpään. Mikä ohjelma/prosessi on ylimpänä?",
        l),"slow_top_process");
    }
    if(any(t,["memory","ram","память","muisti"]) && any(t,["100","90","80","high","высок","korkea"])){
      S.facts.high="memory"; S.step="slow_top_process";
      return q(T(
        "Memory usage is high. Sort by Memory and tell me the top three programs and their approximate usage.",
        "Память сильно загружена. Отсортируй по «Память» и напиши три верхние программы и их примерное потребление.",
        "Muistinkäyttö on korkea. Lajittele Memory-sarakkeen mukaan ja kerro kolme ylintä ohjelmaa sekä niiden käyttö.",
        l),"slow_top_process");
    }
    if(any(t,["disk","диск","levy"]) && any(t,["100","90","80","high","высок","korkea"])){
      S.facts.high="disk"; S.step="slow_top_process";
      return q(T(
        "Disk usage is high. Sort by Disk and tell me which process stays at the top for about 20–30 seconds.",
        "Диск сильно загружен. Отсортируй по «Диск» и напиши, какой процесс держится сверху примерно 20–30 секунд.",
        "Levyn käyttö on korkea. Lajittele Disk-sarakkeen mukaan ja kerro mikä prosessi pysyy ylimpänä noin 20–30 sekuntia.",
        l),"slow_top_process");
    }
    if(k==="done" || k==="continue"){
      return q(T(
        "What do you see as highest: CPU, Memory, or Disk? You can also give me the percentages.",
        "Что загружено сильнее всего: CPU/ЦП, Память или Диск? Можешь написать проценты.",
        "Mikä on korkein: CPU, Memory vai Disk? Voit myös antaa prosentit.",
        l),"slow_resource");
    }
  }
}

/* ---------- Printer ---------- */
function printerStart(l){
  setIssue("printer","printer_power");
  return q(T(
    "Let's narrow it down. Is the printer powered on and does Windows show it as Online/Ready, or Offline?",
    "Давай уточним. Принтер включён, и Windows показывает его как «Готов/Online» или как «Offline/Не в сети»?",
    "Rajataan ongelmaa. Onko tulostin päällä ja näyttääkö Windows sen tilaksi Online/Ready vai Offline?",
    l),"printer_power");
}
function printerFlow(text,k,l){
  const t=clean(text);
  if(S.step==="printer_power"){
    if(any(t,["offline","не в сети","офлайн"])){
      S.step="printer_connection";
      return q(T(
        "Is this printer connected by USB cable or through Wi‑Fi/network?",
        "Этот принтер подключён USB-кабелем или через Wi‑Fi/сеть?",
        "Onko tulostin yhdistetty USB-kaapelilla vai Wi‑Fi/verkon kautta?",
        l),"printer_connection");
    }
    if(any(t,["online","ready","готов","готово","valmis"]) || k==="yes"){
      S.step="printer_queue"; S.lastInstruction="printer_queue";
      return instr(instructionText("printer_queue",l),"printer_queue");
    }
  }
  if(S.step==="printer_queue"){
    if(k==="yes"){
      return instr(T(
        "Select the stuck print job and cancel it. If several jobs are stuck, cancel all of them. Then try printing one simple page again. Tell me whether it prints.",
        "Выбери зависшее задание и отмени его. Если зависло несколько — отмени все. Затем попробуй напечатать одну простую страницу. Напиши, печатает ли.",
        "Valitse jumiutunut tulostustyö ja peruuta se. Jos useita töitä on jumissa, peruuta kaikki. Tulosta sitten yksi yksinkertainen sivu ja kerro onnistuuko.",
        l),"printer_clear_queue");
    }
    if(k==="no"){
      S.step="printer_test_page";
      return instr(T(
        "Open printer properties and try Print Test Page. If the test page also fails, tell me whether Windows shows any error message.",
        "Открой свойства принтера и попробуй «Печать пробной страницы». Если она тоже не печатается, напиши, какую ошибку показывает Windows.",
        "Avaa tulostimen ominaisuudet ja kokeile Print Test Page. Jos testisivukaan ei tulostu, kerro näkyykö Windowsissa virheilmoitus.",
        l),"printer_test_page");
    }
  }
}

/* ---------- Sound ---------- */
function soundStart(l){
  setIssue("sound","sound_output");
  S.lastInstruction="sound_output";
  return instr(instructionText("sound_output",l),"sound_output");
}
function soundFlow(text,k,l){
  if(S.step==="sound_output"){
    if(k==="yes") return finish(T("Great — the wrong output device was selected.","Отлично — было выбрано неправильное устройство вывода.","Hyvä — väärä äänilähtö oli valittuna.",l));
    if(k==="no" || k==="still"){
      S.step="sound_mute_app";
      return q(T(
        "Is there no sound everywhere in Windows, or only in one application/browser?",
        "Звука нет вообще во всей Windows или только в одной программе/браузере?",
        "Puuttuuko ääni kaikkialta Windowsissa vai vain yhdessä ohjelmassa/selaimessa?",
        l),"sound_scope");
    }
  }
}

/* ---------- Display ---------- */
function displayStart(l){
  setIssue("display","display_detect");
  S.lastInstruction="display_detect";
  return instr(instructionText("display_detect",l),"display_detect");
}
function displayFlow(text,k,l){
  if(S.step==="display_detect"){
    if(k==="yes"){
      S.step="display_mode";
      return q(T(
        "Good. Is the monitor detected but still black, or does it now show the desktop?",
        "Хорошо. Монитор определяется, но экран всё ещё чёрный, или рабочий стол уже появился?",
        "Hyvä. Tunnistaako Windows näytön mutta se on yhä musta, vai näkyykö työpöytä jo?",
        l),"display_mode");
    }
    if(k==="no"){
      S.step="display_cable";
      return instr(T(
        "Check both ends of the HDMI/DisplayPort cable, then if possible try another cable or another port. Also make sure the monitor input/source matches the cable (HDMI/DP). Tell me what changes.",
        "Проверь оба конца HDMI/DisplayPort кабеля, затем по возможности попробуй другой кабель или другой порт. Также проверь, что на мониторе выбран правильный источник сигнала HDMI/DP. Напиши, что изменилось.",
        "Tarkista HDMI/DisplayPort-kaapelin molemmat päät ja kokeile mahdollisuuksien mukaan toista kaapelia tai porttia. Varmista myös, että näytön tulolähde vastaa kaapelia (HDMI/DP). Kerro mitä muuttuu.",
        l),"display_cable");
    }
  }
}

/* ---------- Bluetooth ---------- */
function bluetoothStart(l){
  setIssue("bluetooth","bluetooth_toggle");
  S.lastInstruction="bluetooth_toggle";
  return instr(instructionText("bluetooth_toggle",l),"bluetooth_toggle");
}
function bluetoothFlow(text,k,l){
  if(S.step==="bluetooth_toggle"){
    if(k==="yes"){
      return q(T(
        "Good. When you select the device, does pairing complete or show an error?",
        "Хорошо. Когда выбираешь устройство, сопряжение завершается или появляется ошибка?",
        "Hyvä. Kun valitset laitteen, onnistuuko pariliitos vai tuleeko virhe?",
        l),"bluetooth_pair_result");
    }
    if(k==="no"){
      S.step="bluetooth_adapter";
      return instr(T(
        "Open Device Manager → Bluetooth. Do you see a Bluetooth adapter there, and does it have a yellow warning symbol?",
        "Открой Диспетчер устройств → Bluetooth. Видишь там Bluetooth-адаптер и есть ли возле него жёлтый значок предупреждения?",
        "Avaa Laitehallinta → Bluetooth. Näkyykö siellä Bluetooth-sovitin ja onko siinä keltainen varoitusmerkki?",
        l),"bluetooth_adapter");
    }
  }
}

/* ---------- Malware ---------- */
function malwareStart(l){
  setIssue("malware","defender_scan");
  S.lastInstruction="defender_scan";
  return instr(T(
    "Let's start with a safe built-in scan rather than downloading random cleaners.\n\n"+instructionText("defender_scan",l),
    "Начнём с безопасной встроенной проверки, а не со случайных «чистильщиков» из интернета.\n\n"+instructionText("defender_scan",l),
    "Aloitetaan turvallisella sisäänrakennetulla tarkistuksella eikä satunnaisilla puhdistusohjelmilla.\n\n"+instructionText("defender_scan",l),
    l),"defender_scan");
}
function malwareFlow(text,k,l){
  if(S.step==="defender_scan" && (k==="done" || k==="continue")){
    return q(T(
      "What did Defender report: no threats, threats found, or scan could not complete?",
      "Что сообщил Defender: угроз не найдено, угрозы найдены или проверка не завершилась?",
      "Mitä Defender ilmoitti: ei uhkia, uhkia löytyi vai tarkistus ei valmistunut?",
      l),"defender_result");
  }
}

/* ---------- Windows Update ---------- */
function updateStart(l){
  setIssue("windows_update_problem","update_check");
  return instr(T(
`Open Settings → Windows Update.
1. Click Check for updates.
2. If an update fails, note the error code, for example 0x800....
3. Restart the PC once and try again.
Tell me the exact error code or message if it still fails.`,
`Открой Параметры → Windows Update.
1. Нажми «Проверить наличие обновлений».
2. Если обновление не устанавливается, запиши код ошибки, например 0x800....
3. Один раз перезагрузи ПК и попробуй снова.
Если снова не получится — напиши точный код или текст ошибки.`,
`Avaa Asetukset → Windows Update.
1. Valitse Check for updates.
2. Jos päivitys epäonnistuu, kirjoita virhekoodi, esimerkiksi 0x800....
3. Käynnistä tietokone kerran uudelleen ja yritä uudelleen.
Jos se epäonnistuu taas, kerro tarkka virhekoodi tai viesti.`,l),"update_check");
}

/* ---------- ISP ---------- */
function ispStart(l){
  setIssue("isp","isp_device_test");
  return q(T(
    "Let's check whether it is really the ISP. Does the Internet fail on more than one device connected to the same router?",
    "Давай проверим, действительно ли проблема у провайдера. Интернет не работает более чем на одном устройстве, подключённом к тому же роутеру?",
    "Tarkistetaan onko syy todella operaattorissa. Eikö internet toimi useammalla kuin yhdellä samaan reitittimeen yhdistetyllä laitteella?",
    l),"isp_device_test");
}
function ispFlow(text,k,l){
  if(S.step==="isp_device_test"){
    if(k==="yes"){
      S.step="isp_router_restart"; S.lastInstruction="router_restart";
      return instr(T(
        "Before blaming the ISP, restart the router safely: unplug power for about 30 seconds, reconnect it, wait 3–5 minutes, and test two devices again. Do not press RESET. Tell me “done”.",
        "Прежде чем считать виноватым провайдера, безопасно перезапусти роутер: отключи питание примерно на 30 секунд, включи обратно, подожди 3–5 минут и снова проверь два устройства. RESET не нажимай. Напиши «готово».",
        "Ennen kuin epäilemme operaattoria, käynnistä reititin turvallisesti uudelleen: irrota virta noin 30 sekunniksi, kytke takaisin, odota 3–5 minuuttia ja testaa kaksi laitetta. Älä paina RESET. Kirjoita “valmis”.",
        l),"router_restart");
    }
    if(k==="no"){
      return answer(T(
        "If only one device is affected, the ISP is unlikely to be the main cause. We should troubleshoot that device instead. Tell me what device it is and what exactly does not work.",
        "Если проблема только на одном устройстве, провайдер маловероятно является основной причиной. Лучше проверять само устройство. Напиши, что это за устройство и что именно не работает.",
        "Jos ongelma koskee vain yhtä laitetta, operaattori ei todennäköisesti ole pääsyy. Tutkitaan itse laitetta. Kerro mikä laite se on ja mikä tarkalleen ei toimi.",
        l));
    }
  }
  if(S.step==="isp_router_restart" && (k==="done" || k==="continue")){
    S.step="isp_status";
    return q(T(
        "After the restart, are multiple devices still offline?",
        "После перезапуска интернета всё ещё нет на нескольких устройствах?",
        "Ovatko useat laitteet edelleen ilman internetiä uudelleenkäynnistyksen jälkeen?",
        l),"isp_status");
  }
  if(S.step==="isp_status"){
    if(k==="yes"){
      return answer(T(
        "Then the ISP/line is a strong possibility. Use mobile data to check your provider's outage page or contact support. If you tell me your ISP name, I can tell you what information to look for.",
        "Тогда проблема у провайдера или на линии вполне вероятна. Через мобильный интернет проверь страницу аварий своего оператора или обратись в поддержку. Если назовёшь провайдера, я подскажу, что именно искать.",
        "Silloin operaattori/yhteys on vahva mahdollisuus. Tarkista mobiilidatalla operaattorin häiriösivu tai ota yhteyttä tukeen. Jos kerrot operaattorin nimen, voin sanoa mitä tietoja kannattaa etsiä.",
        l));
    }
    if(k==="no"){
      return finish(T(
        "Good. The connection recovered after the router restart, so the ISP may not have been the cause.",
        "Хорошо. После перезапуска роутера связь восстановилась, поэтому провайдер мог быть ни при чём.",
        "Hyvä. Yhteys palautui reitittimen uudelleenkäynnistyksen jälkeen, joten operaattori ei välttämättä ollut syy.",
        l));
    }
  }
}

/* ---------- DNS direct ---------- */
function dnsStart(l){
  setIssue("dns","dns_intent");
  return q(T(
    "Do you want to know what DNS is, or are you trying to fix a DNS/website problem? You can answer “explain” or “fix”.",
    "Ты хочешь узнать, что такое DNS, или пытаешься исправить проблему DNS/открытия сайтов? Можно ответить «объясни» или «исправить».",
    "Haluatko tietää mikä DNS on, vai yritätkö korjata DNS-/verkkosivuongelmaa? Voit vastata “selitä” tai “korjaa”.",
    l),"dns_intent");
}
function dnsFlow(text,k,l){
  const t=clean(text);
  if(S.step==="dns_intent"){
    if(any(t,["explain","what is","объясни","что это","selitä","mikä se on"])){
      S.resumeStep="dns_intent"; S.pausedForDefinition=true;
      return answer(T(
        "DNS is the Internet's address book: it translates names such as example.com into IP addresses. If DNS fails, Wi‑Fi can still be connected while websites do not open by name. If you want, say “fix” and I'll guide you step by step.",
        "DNS — это «адресная книга интернета»: он переводит имена вроде example.com в IP‑адреса. При сбое DNS Wi‑Fi может оставаться подключённым, но сайты по именам не открываются. Если хочешь исправить — напиши «исправить», и я проведу по шагам.",
        "DNS on internetin osoitekirja: se muuntaa nimet kuten example.com IP-osoitteiksi. DNS-ongelmassa Wi‑Fi voi olla yhdistetty mutta sivut eivät avaudu nimellä. Jos haluat korjata ongelmaa, kirjoita “korjaa”, niin etenemme vaiheittain.",
        l));
    }
    if(any(t,["fix","repair","исправить","починить","korjaa"]) || k==="continue"){
      S.step="dns_flush"; S.lastInstruction="dns_flush";
      return instr(instructionText("dns_flush",l),"dns_flush");
    }
  }
  if(S.step==="dns_flush"){
    if(k==="done" || k==="continue"){
      S.step="dns_result";
      return q(T(
        "Now test two or three websites. Do they open normally?",
        "Теперь проверь два-три сайта. Они открываются нормально?",
        "Testaa nyt kaksi tai kolme verkkosivua. Avautuvatko ne normaalisti?",
        l),"dns_result");
    }
  }
  if(S.step==="dns_result"){
    if(k==="yes") return finish(T("Great. The DNS cache was likely the problem.","Отлично. Скорее всего, проблема была в DNS-кэше.","Hyvä. DNS-välimuisti oli todennäköisesti ongelma.",l));
    if(k==="no" || k==="still"){
      S.issue="internet"; S.step="internet_device_test";
      return q(T(
        "Flushing DNS did not fix it, so let's not repeat the same step. Does the Internet work on another device connected to the same Wi‑Fi?",
        "Очистка DNS не помогла, поэтому повторять её не будем. Интернет работает на другом устройстве в той же Wi‑Fi сети?",
        "DNS-välimuistin tyhjennys ei auttanut, joten emme toista samaa vaihetta. Toimiiko internet toisella samaan Wi‑Fi-verkkoon yhdistetyllä laitteella?",
        l),"internet_device_test");
    }
  }
}

function finish(text){
  const r=answer(text);
  S.step="finished";
  return r;
}

function handleSideCommands(text,k,l){
  if(k==="why"){
    return answer(whyForCurrent(l));
  }
  if(k==="how"){
    return answer(repeatHow(l));
  }
  if(k==="back"){
    return answer(T(
      "I won't change anything automatically. Tell me which previous action you want to undo, and I will show you how to return it safely.",
      "Я ничего не меняю автоматически. Напиши, какое предыдущее действие хочешь отменить, и я покажу, как безопасно вернуть всё назад.",
      "En muuta mitään automaattisesti. Kerro mikä aiempi toimenpide halutaan perua, niin näytän miten se palautetaan turvallisesti.",
      l));
  }
  if(S.step==="finished" && k==="continue"){
    return answer(T(
      "That troubleshooting path is complete. Tell me what still feels wrong, or describe a new IT problem.",
      "Эта ветка диагностики завершена. Напиши, что всё ещё работает неправильно, или опиши новую IT‑проблему.",
      "Tämä vianmäärityshaara on valmis. Kerro mikä toimii edelleen väärin tai kuvaa uusi IT-ongelma.",
      l));
  }
  return null;
}

C.handle = function(text,l){
  if(!text || !String(text).trim()) return null;

  const previousLang=S.language;
  const detected=langOf(text,l || previousLang);
  S.language=detected;
  rememberHistory("user",text);

  const k=kind(text);
  const issue=detectIssue(text);

  // A new explicit issue can switch the active branch.
  if(issue && issue !== S.issue){
    switch(issue){
      case "internet": return internetStart(detected);
      case "wifi": return wifiStart(detected);
      case "browser": return browserStart(detected);
      case "slow_pc": return slowStart(detected);
      case "printer": return printerStart(detected);
      case "sound": return soundStart(detected);
      case "display": return displayStart(detected);
      case "bluetooth": return bluetoothStart(detected);
      case "malware": return malwareStart(detected);
      case "windows_update_problem": return updateStart(detected);
      case "isp": return ispStart(detected);
      case "dns": return dnsStart(detected);
    }
  }

  // Side commands must work in the middle of a diagnostic branch.
  const side=handleSideCommands(text,k,detected);
  if(side) return side;

  // Continue the active troubleshooting tree.
  if(S.issue){
    let r=null;
    switch(S.issue){
      case "internet": r=internetFlow(text,k,detected); break;
      case "wifi": r=wifiFlow(text,k,detected); break;
      case "browser": r=browserFlow(text,k,detected); break;
      case "slow_pc": r=slowFlow(text,k,detected); break;
      case "printer": r=printerFlow(text,k,detected); break;
      case "sound": r=soundFlow(text,k,detected); break;
      case "display": r=displayFlow(text,k,detected); break;
      case "bluetooth": r=bluetoothFlow(text,k,detected); break;
      case "malware": r=malwareFlow(text,k,detected); break;
      case "isp": r=ispFlow(text,k,detected); break;
      case "dns": r=dnsFlow(text,k,detected); break;
    }
    if(r) return r;

    // Helpful contextual fallback instead of losing the thread.
    if(k==="still"){
      markFailed(S.lastInstruction || S.step);
      return answer(T(
        "Understood — that did not fix it. I will not repeat the same step. Tell me what you see now: an error message, no change at all, or a different symptom?",
        "Понял — это не помогло. Повторять тот же шаг не буду. Что сейчас видно: появилась ошибка, вообще ничего не изменилось или симптом стал другим?",
        "Selvä — se ei korjannut ongelmaa. En toista samaa vaihetta. Mitä näet nyt: virheilmoituksen, ei mitään muutosta vai erilaisen oireen?",
        detected));
    }

    if(k==="done"){
      return answer(T(
        "Good. What happened after you did it? Did the problem disappear, stay exactly the same, or change?",
        "Хорошо. Что произошло после этого? Проблема исчезла, осталась точно такой же или изменилась?",
        "Hyvä. Mitä tapahtui sen jälkeen? Poistuiko ongelma, pysyikö se täysin samana vai muuttuiko se?",
        detected));
    }

    if(k==="yes" || k==="no"){
      return answer(T(
        "I understood your yes/no answer, but I need one more detail for this branch. Please answer the last question with a few words so I know exactly what you are confirming.",
        "Я понял ответ «да/нет», но для этой ветки нужна ещё одна деталь. Ответь на последний вопрос парой слов, чтобы было понятно, что именно ты подтверждаешь.",
        "Ymmärsin kyllä/ei-vastauksen, mutta tässä haarassa tarvitsen vielä yhden yksityiskohdan. Vastaa viimeiseen kysymykseen muutamalla sanalla, jotta tiedän mitä vahvistat.",
        detected));
    }
  }

  return null;
};

window.ANITA_V12=C;

// Wrap the existing ANITA_V7 pipeline so Conversation Core gets first chance.
if(window.ANITA_V7 && typeof window.ANITA_V7.handle==="function"){
  const previous=window.ANITA_V7.handle.bind(window.ANITA_V7);
  window.ANITA_V7.handle=function(text,l){
    const r=C.handle(text,l);
    if(r) return r;
    return previous(text,l);
  };
}

// Optional helper for debugging in browser console.
window.anitaConversationState=function(){
  return JSON.parse(JSON.stringify(C.state));
};

console.log("[ANITA v12] Multilingual Conversation Core loaded");
})();

/* ================= ANITA v12.1 NATURAL LANGUAGE FIX ================= */
(function(){
"use strict";
if(!window.ANITA_V12 || typeof window.ANITA_V12.handle!=="function") return;
const V=window.ANITA_V12, old=V.handle.bind(V);
const n=s=>(s||"").toLowerCase().replace(/[?!.,:;()[\]{}"“”]/g," ").replace(/\s+/g," ").trim();

function lang(t){
 if(/[а-яё]/i.test(t)) return "ru";
 if(/[äöå]/i.test(t)||/\b(tietokone|kone|läppäri|toimii|hidas|hitaasti|lagaa)\b/i.test(t)) return "fi";
 return "en";
}
function slow(t){
 t=n(t);
 return [
 /\bit (?:work|works|working|run|runs|running|is|feels|seems) (?:very )?(?:slow|slowly|laggy|sluggish)\b/,
 /\b(?:pc|computer|laptop|windows|machine) (?:is |works? |runs? |feels? |seems? )?(?:very )?(?:slow|slowly|laggy|sluggish)\b/,
 /\b(?:works?|runs?) (?:very )?(?:slow|slowly)\b/,
 /\b(?:компьютер|комп|пк|ноутбук|ноут|windows) (?:работает |стал |стала |очень )*(?:медленно|тормозит|лагает|тупит)\b/,
 /\b(?:он|оно|это) (?:работает |очень )*(?:медленно|тормозит|лагает|тупит)\b/,
 /\b(?:tietokone|kone|pc|läppäri|windows|se|tämä) (?:on |toimii |käy |tuntuu )*(?:todella |tosi |hyvin )?(?:hidas|hitaasti|lagaa)\b/
 ].some(r=>r.test(t));
}
function startSlow(l){
 const S=V.state;
 S.issue="slow_pc"; S.step="slow_task_manager"; S.language=l; S.device="computer";
 S.lastQuestion=null; S.lastInstruction="slow_task_manager"; S.completed=[]; S.failed=[]; S.facts={};
 const m={
 en:`Got it — your computer is working slowly. Let's find the cause instead of guessing.

First check:
1. Press Ctrl + Shift + Esc to open Task Manager.
2. Look at CPU, Memory and Disk.
3. Tell me which one is highest and approximately what percentage it shows.

For example: “CPU 95%”, “Memory 82%”, or “Disk 100%”.`,
 ru:`Понял — компьютер работает медленно. Давай выясним причину, а не будем гадать.

Сначала проверь:
1. Нажми Ctrl + Shift + Esc — откроется Диспетчер задач.
2. Посмотри ЦП/CPU, Память и Диск.
3. Напиши, что загружено сильнее всего и примерно на сколько процентов.

Например: «CPU 95%», «Память 82%» или «Диск 100%».`,
 fi:`Selvä — tietokone toimii hitaasti. Selvitetään syy sen sijaan, että arvaamme.

Tarkista ensin:
1. Paina Ctrl + Shift + Esc avataksesi Tehtävienhallinnan.
2. Katso CPU, Memory ja Disk.
3. Kerro mikä niistä on korkein ja suunnilleen kuinka monta prosenttia se näyttää.

Esimerkiksi: “CPU 95 %”, “Memory 82 %” tai “Disk 100 %”.`
 }[l];
 S.lastAnswer=m;
 return {type:"answer",text:m};
}
V.handle=function(text,l){
 if(slow(text)) return startSlow(lang(text));
 return old(text,l);
};
window.ANITA_V12_1={version:"12.1",slow};
console.log("[ANITA v12.1] Natural language fix loaded");
})();

/* ================= ANITA v12.2 SEMANTIC PRIORITY FIX =================
   Purpose:
   - understand the symptom the user ACTUALLY said
   - "slow" must never be reinterpreted as "glitching/weird"
   - explicit symptom words outrank vague fallback categories
   - natural imperfect EN/RU/FI is accepted
   - deterministic semantic priority layer runs BEFORE older engines
   ==================================================================== */
(function(){
"use strict";

if(!window.ANITA_V12 || typeof window.ANITA_V12.handle!=="function") return;

const V = window.ANITA_V12;
const previous = V.handle.bind(V);

const norm = s => (s||"")
  .toLowerCase()
  .replace(/[’`]/g,"'")
  .replace(/[?!.,:;()[\]{}"“”]/g," ")
  .replace(/\s+/g," ")
  .trim();

const token = (t,w) => new RegExp("(^|\\s)"+w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"(?=\\s|$)","i").test(t);

function langOf(text){
  if(/[а-яё]/i.test(text)) return "ru";
  if(/[äöå]/i.test(text) || /\b(tietokone|kone|läppäri|toimii|hidas|hitaasti|jäätyy|välkkyy)\b/i.test(text)) return "fi";
  return "en";
}

/* Explicit semantic concepts.
   IMPORTANT: these are mutually prioritized.
   Specific symptom > vague symptom.
*/
function concepts(text){
  const t = norm(text);

  const c = {
    slow:false,
    freeze:false,
    crash:false,
    graphics:false,
    error:false,
    input:false,
    shell:false,
    weird:false,
    internet:false,
    browser:false,
    pc:false,
    windows:false
  };

  // Entity/context
  c.pc = /\b(pc|computer|laptop|machine|desktop|компьютер|комп|пк|ноутбук|ноут|tietokone|kone|läppäri)\b/i.test(t)
      || /\bit\b/i.test(t) || /\bон\b/i.test(t) || /\bse\b/i.test(t);
  c.windows = /\bwindows\b/i.test(t) || /\bвиндовс\b/i.test(t);

  // SLOW — broad natural grammar, but semantically precise.
  c.slow =
    /\bslow\b|\bslowly\b|\bsluggish\b|\blaggy\b|\blags?\b|\blagging\b/i.test(t) ||
    /\bмедленн\w*\b|\bтормоз\w*\b|\bлага\w*\b|\bтуп\w*\b/i.test(t) ||
    /\bhidas\b|\bhitaasti\b|\blagaa\b|\bhidastelee\b/i.test(t);

  // Freeze / hang
  c.freeze =
    /\bfreeze\b|\bfreezes\b|\bfrozen\b|\bhanging\b|\bhangs\b|\bnot responding\b/i.test(t) ||
    /\bзавис\w*\b|\bне отвечает\b/i.test(t) ||
    /\bjääty\w*\b|\bei vastaa\b/i.test(t);

  // Crash / close unexpectedly
  c.crash =
    /\bcrash\w*\b|\bcloses? by itself\b|\bkeeps closing\b/i.test(t) ||
    /\bвылет\w*\b|\bзакрывается сам\w*\b/i.test(t) ||
    /\bkaatu\w*\b|\bsulkeutuu itsestään\b/i.test(t);

  // Graphics
  c.graphics =
    /\bflicker\w*\b|\bartifact\w*\b|\bblack screen\b|\bscreen flashes\b/i.test(t) ||
    /\bмерца\w*\b|\bартефакт\w*\b|\bчерн\w* экран\b|\bчёрн\w* экран\b/i.test(t) ||
    /\bvälk\w*\b|\bartifakt\w*\b|\bmusta ruutu\b/i.test(t);

  // Errors
  c.error =
    /\berror\b|\berror message\b|\bpopup\b|\bpop up\b|\bcode 0x/i.test(t) ||
    /\bошибк\w*\b|\bвсплыва\w*\b|\bкод 0x/i.test(t) ||
    /\bvirhe\w*\b|\bponnahdus\w*\b/i.test(t);

  // Mouse / keyboard
  c.input =
    /\bmouse\b|\bkeyboard\b|\bcursor\b/i.test(t) ||
    /\bмыш\w*\b|\bклавиатур\w*\b|\bкурсор\b/i.test(t) ||
    /\bhiiri\b|\bnäppäimist\w*\b|\bkohdistin\b/i.test(t);

  // Explorer / taskbar / Start
  c.shell =
    /\bexplorer\b|\btaskbar\b|\bstart menu\b/i.test(t) ||
    /\bпроводник\b|\bпанел\w* задач\b|\bменю пуск\b/i.test(t) ||
    /\bresurssienhallinta\b|\btehtäväpalkki\b|\bkäynnistä valikko\b/i.test(t);

  // Vague weird/glitch terms. LOWEST priority.
  c.weird =
    /\bweird\b|\bweirdly\b|\bglitch\b|\bglitches\b|\bglitching\b|\bacting strange\b|\bacting weird\b|\bbehaves abnormally\b/i.test(t) ||
    /\bстранн\w*\b|\bглюч\w*\b|\bнеобычн\w*\b/i.test(t) ||
    /\bouto\w*\b|\bglitch\w*\b|\btoimii oudosti\b/i.test(t);

  c.internet =
    /\binternet\b|\bwifi\b|\bwi fi\b|\bnetwork\b|\bинтернет\b|\bвайфай\b|\bсеть\b|\bnetti\b|\bverkko\b/i.test(t);

  c.browser =
    /\bbrowser\b|\bchrome\b|\bedge\b|\bfirefox\b|\bwebsite\b|\bpage\b|\bбраузер\b|\bсайт\b|\bстраниц\w*\b|\bselain\b|\bverkkosivu\b/i.test(t);

  return c;
}

function resetFor(issue,l){
  const S=V.state;
  S.issue=issue;
  S.branch=null;
  S.language=l;
  S.lastQuestion=null;
  S.lastAnswer=null;
  S.completed=[];
  S.failed=[];
  S.facts={};
  return S;
}

function slowReply(l){
  const S=resetFor("slow_pc",l);
  S.step="slow_task_manager";
  S.lastInstruction="slow_task_manager";

  const text={
    en:`Got it — your computer is running slowly.

I won't treat “slow” as “glitching”, because those are different symptoms. Let's check what is actually causing the slowdown.

1. Press Ctrl + Shift + Esc to open Task Manager.
2. Look at CPU, Memory and Disk.
3. Tell me which one is highest and roughly what percentage it shows.

For example: “CPU 95%”, “Memory 82%”, or “Disk 100%”.`,
    ru:`Понял — компьютер работает медленно.

Я не буду трактовать «медленно» как «глючит», потому что это разные симптомы. Давай проверим, что именно вызывает торможение.

1. Нажми Ctrl + Shift + Esc — откроется Диспетчер задач.
2. Посмотри ЦП/CPU, Память и Диск.
3. Напиши, что загружено сильнее всего и примерно на сколько процентов.

Например: «CPU 95%», «Память 82%» или «Диск 100%».`,
    fi:`Selvä — tietokone toimii hitaasti.

En tulkitse “hidas” tarkoittamaan “glitching/outo”, koska ne ovat eri oireita. Selvitetään mikä hidastaa konetta.

1. Paina Ctrl + Shift + Esc avataksesi Tehtävienhallinnan.
2. Katso CPU, Memory ja Disk.
3. Kerro mikä niistä on korkein ja suunnilleen kuinka monta prosenttia se näyttää.

Esimerkiksi: “CPU 95 %”, “Memory 82 %” tai “Disk 100 %”.`
  }[l];

  S.lastAnswer=text;
  return {type:"answer",text};
}

function freezeReply(l){
  const S=resetFor("freeze",l);
  S.step="freeze_scope";
  const text={
    en:"Understood — this sounds like freezing, not slowness. Does the whole computer freeze, or only one program?",
    ru:"Понял — это похоже именно на зависание, а не на медленную работу. Зависает весь компьютер или только одна программа?",
    fi:"Selvä — tämä kuulostaa jäätymiseltä, ei hitaudelta. Jäätyykö koko tietokone vai vain yksi ohjelma?"
  }[l];
  S.lastQuestion="freeze_scope"; S.lastAnswer=text;
  return {type:"answer",text};
}

function crashReply(l){
  const S=resetFor("crash",l);
  S.step="crash_scope";
  const text={
    en:"Understood — the program is crashing/closing unexpectedly. Which program is it, and does it show an error before it closes?",
    ru:"Понял — программа вылетает или неожиданно закрывается. Какая именно программа и появляется ли ошибка перед закрытием?",
    fi:"Selvä — ohjelma kaatuu tai sulkeutuu odottamatta. Mikä ohjelma on kyseessä ja näkyykö virhe ennen sulkeutumista?"
  }[l];
  S.lastQuestion="crash_scope"; S.lastAnswer=text;
  return {type:"answer",text};
}

function graphicsReply(l){
  const S=resetFor("graphics",l);
  S.step="graphics_scope";
  const text={
    en:"Understood — this is a display/graphics symptom. Is the screen flickering, showing artifacts, going black, or showing “No signal”?",
    ru:"Понял — это симптом, связанный с экраном/графикой. Экран мерцает, показывает артефакты, становится чёрным или пишет «Нет сигнала»?",
    fi:"Selvä — tämä liittyy näyttöön/grafiikkaan. Välkkyykö näyttö, näkyykö artefakteja, meneekö se mustaksi vai näkyykö “No signal”?"
  }[l];
  S.lastQuestion="graphics_scope"; S.lastAnswer=text;
  return {type:"answer",text};
}

function weirdReply(l){
  const S=resetFor("weird",l);
  S.step="weird_scope";
  const text={
    en:`I understand that something is behaving strangely, but “weird/glitching” is too broad to diagnose safely.

Which is closest?
1. Screen/graphics problem
2. Programs freeze
3. Computer is slow
4. Error messages/popups
5. Mouse/keyboard problem
6. Explorer/taskbar/Start menu problem
7. Something else`,
    ru:`Понял, что компьютер ведёт себя странно, но «глючит/странно» слишком общее описание для точной диагностики.

Что ближе?
1. Проблема с экраном/графикой
2. Программы зависают
3. Компьютер работает медленно
4. Ошибки/всплывающие окна
5. Мышь/клавиатура
6. Проводник/панель задач/Пуск
7. Другое`,
    fi:`Ymmärrän, että jokin toimii oudosti, mutta “outo/glitching” on liian yleinen kuvaus tarkkaan vianmääritykseen.

Mikä sopii parhaiten?
1. Näyttö/grafiikka
2. Ohjelmat jäätyvät
3. Tietokone on hidas
4. Virheilmoitukset/ponnahdusikkunat
5. Hiiri/näppäimistö
6. Resurssienhallinta/tehtäväpalkki/Käynnistä
7. Jokin muu`
  }[l];
  S.lastQuestion="weird_scope"; S.lastAnswer=text;
  return {type:"answer",text};
}

/* Priority classifier:
   1 slow
   2 freeze
   3 crash
   4 graphics
   5 error/input/shell (leave existing specific engines a chance)
   6 weird
*/
function semanticIntercept(text){
  const c=concepts(text);
  const l=langOf(text);

  // SLOW wins even if the sentence also contains "weird":
  // "my pc is weirdly slow" -> SLOW.
  if(c.slow && (c.pc || c.windows || /\bit\b|\bono\b|\bон\b|\bse\b/i.test(norm(text))))
    return slowReply(l);

  if(c.freeze && (c.pc || c.windows))
    return freezeReply(l);

  if(c.crash)
    return crashReply(l);

  if(c.graphics)
    return graphicsReply(l);

  // Only classify as vague glitching when NO explicit symptom exists.
  const explicit = c.slow || c.freeze || c.crash || c.graphics || c.error || c.input || c.shell;
  if(c.weird && !explicit)
    return weirdReply(l);

  return null;
}

V.handle=function(text,l){
  const hit=semanticIntercept(text);
  if(hit) return hit;
  return previous(text,l);
};

window.ANITA_V12_2={
  version:"12.2",
  concepts,
  semanticIntercept
};

console.log("[ANITA v12.2] Semantic Priority Fix loaded");
})();

/* ================= ANITA v12.3 CAUSE + SOLUTION ENGINE =================
   Fixes an important conversational problem:
   a NEW concrete question such as
     "my browser takes alot of memory why?"
   must override the previous troubleshooting follow-up ("why?").

   ANITA should:
   1) understand the new subject,
   2) explain likely causes,
   3) give useful actions,
   4) continue diagnosis from the result.

   RU / EN / FI.
   ====================================================================== */
(function(){
"use strict";

if(!window.ANITA_V12 || typeof window.ANITA_V12.handle!=="function") return;

const V = window.ANITA_V12;
const previous = V.handle.bind(V);

const norm = s => (s||"")
  .toLowerCase()
  .replace(/[’`]/g,"'")
  .replace(/[?!.,:;()[\]{}"“”]/g," ")
  .replace(/\s+/g," ")
  .trim();

function langOf(text){
  if(/[а-яё]/i.test(text)) return "ru";
  if(/[äöå]/i.test(text) || /\b(selain|muisti|paljon|miksi|chrome käyttää|välilehti)\b/i.test(text)) return "fi";
  return "en";
}

function reset(issue, step, l){
  const S=V.state;
  S.issue=issue;
  S.branch=null;
  S.step=step;
  S.language=l;
  S.lastQuestion=null;
  S.lastInstruction=null;
  S.lastAnswer=null;
  S.completed=[];
  S.failed=[];
  S.facts={};
  return S;
}

function isBrowserMemoryQuestion(text){
  const t=norm(text);

  const browser =
    /\b(browser|chrome|google chrome|edge|firefox|opera|brave)\b/i.test(t) ||
    /\b(браузер|хром|гугл хром|эдж|фаерфокс|опера)\b/i.test(t) ||
    /\b(selain|chrome|google chrome|edge|firefox|opera|brave)\b/i.test(t);

  const memory =
    /\b(memory|ram)\b/i.test(t) ||
    /\b(память|оперативн|озу)\b/i.test(t) ||
    /\b(muisti|ram)\b/i.test(t);

  const usage =
    /\b(takes|take|using|uses|use|consume|consumes|high|a lot|alot|too much|1000 ?mb|1 ?gb)\b/i.test(t) ||
    /\b(жр[её]т|использует|занимает|много|слишком много|нагружает)\b/i.test(t) ||
    /\b(käyttää|vie|paljon|liikaa|korkea)\b/i.test(t);

  return browser && memory && usage;
}

function browserMemoryStart(text,l){
  const S=reset("browser_memory","browser_memory_explain",l);
  S.lastInstruction="browser_memory_check";

  const reply={
en:`Yes — this is a useful clue.

Chrome using around 1000 MB (about 1 GB) is not automatically a fault. Modern browsers split tabs, extensions, the GPU process and background services into separate processes, and they also keep data in RAM to make pages respond faster.

But if your total memory is already around 85%, Chrome can absolutely contribute to the PC feeling slow.

The most useful next check is to find WHAT inside Chrome is using the memory:

1. Open Chrome.
2. Press Shift + Esc — this opens Chrome's own Task Manager.
3. Click the “Memory footprint” column to sort from highest to lowest.
4. Look for:
   • a tab using unusually much memory,
   • an extension using a lot,
   • several heavy tabs at the same time.
5. Close only the heavy tab/extension first and watch Windows Task Manager again.

Also check:
• Chrome → Settings → Performance → turn on Memory Saver.
• Close tabs you no longer need.
• Disable extensions you do not use.
• Restart Chrome occasionally if it has been open for many days.
• Update Chrome.

Important: 1 GB by itself is often normal. The bigger question is how much RAM your computer has in total.

How much total RAM do you have — 4 GB, 8 GB, 16 GB, 32 GB or something else?`,
ru:`Да — это уже полезная зацепка.

То, что Chrome использует около 1000 МБ (примерно 1 ГБ), само по себе ещё не означает неисправность. Современный браузер разделяет вкладки, расширения, GPU-процесс и фоновые службы на отдельные процессы и специально держит часть данных в оперативной памяти, чтобы сайты работали быстрее.

Но если общая загрузка памяти уже около 85%, Chrome действительно может заметно тормозить компьютер.

Сейчас лучше всего выяснить, ЧТО именно внутри Chrome использует память:

1. Открой Chrome.
2. Нажми Shift + Esc — откроется собственный Диспетчер задач Chrome.
3. Нажми столбец «Memory footprint / Объём памяти», чтобы отсортировать по убыванию.
4. Посмотри, что сверху:
   • одна тяжёлая вкладка,
   • расширение,
   • несколько тяжёлых вкладок одновременно.
5. Закрой сначала только самый тяжёлый элемент и снова посмотри загрузку памяти в Диспетчере задач Windows.

Также можно:
• Chrome → Настройки → Производительность → включить «Экономия памяти / Memory Saver».
• Закрыть ненужные вкладки.
• Отключить расширения, которыми не пользуешься.
• Иногда полностью перезапускать Chrome, особенно если он открыт много дней.
• Обновить Chrome.

Важно: 1 ГБ для Chrome часто бывает нормальным. Нам важнее знать, сколько оперативной памяти установлено в компьютере вообще.

Сколько у тебя RAM всего — 4 ГБ, 8 ГБ, 16 ГБ, 32 ГБ или другое значение?`,
fi:`Kyllä — tämä on hyödyllinen havainto.

Se, että Chrome käyttää noin 1000 Mt (noin 1 Gt), ei automaattisesti tarkoita vikaa. Nykyiset selaimet jakavat välilehdet, laajennukset, GPU-prosessin ja taustapalvelut erillisiin prosesseihin ja pitävät tietoja RAM-muistissa, jotta sivut toimivat nopeammin.

Mutta jos kokonaismuistin käyttö on jo noin 85 %, Chrome voi varmasti hidastaa tietokonetta.

Paras seuraava tarkistus on selvittää, MIKÄ Chromen sisällä käyttää muistia:

1. Avaa Chrome.
2. Paina Shift + Esc — Chromen oma Tehtävienhallinta avautuu.
3. Lajittele “Memory footprint” suurimmasta pienimpään.
4. Tarkista onko ylimpänä:
   • yksi raskas välilehti,
   • paljon muistia käyttävä laajennus,
   • useita raskaita välilehtiä.
5. Sulje ensin vain raskain kohde ja tarkista Windowsin Tehtävienhallinnasta muuttuuko muistinkäyttö.

Lisäksi:
• Chrome → Settings → Performance → ota Memory Saver käyttöön.
• Sulje tarpeettomat välilehdet.
• Poista käyttämättömät laajennukset käytöstä.
• Käynnistä Chrome välillä kokonaan uudelleen.
• Päivitä Chrome.

Tärkeää: 1 Gt Chromelle voi olla täysin normaalia. Olennaisempaa on tietää, kuinka paljon RAM-muistia koneessa on yhteensä.

Kuinka paljon RAM-muistia koneessasi on — 4 Gt, 8 Gt, 16 Gt, 32 Gt vai jotain muuta?`
  }[l];

  S.lastAnswer=reply;
  S.lastQuestion="browser_memory_total_ram";
  return {type:"answer",text:reply};
}

function parseRam(text){
  const t=norm(text);
  let m=t.match(/\b(4|8|12|16|24|32|48|64)\s*(?:gb|g|гб|gt)\b/i);
  if(m) return Number(m[1]);
  // short reply like "8"
  if(/^(4|8|12|16|24|32|48|64)$/.test(t)) return Number(t);
  return null;
}

function browserMemoryFlow(text,l){
  const S=V.state;
  const ram=parseRam(text);

  if(S.step==="browser_memory_explain" && ram){
    S.facts.totalRamGB=ram;
    S.step="browser_memory_action";

    let assessment;
    if(ram<=4){
      assessment={
        en:"With 4 GB RAM, 85% usage is very easy to reach. Chrome plus Windows can use most of the available memory. Reducing tabs/extensions will help, but 8 GB or more would make a major difference.",
        ru:"При 4 ГБ RAM загрузка 85% достигается очень легко. Windows и Chrome вместе могут занять почти всю память. Уменьшение вкладок и расширений поможет, но переход хотя бы на 8 ГБ даст заметную разницу.",
        fi:"4 Gt RAM-muistilla 85 % käyttöaste tulee helposti vastaan. Windows ja Chrome voivat yhdessä käyttää lähes kaiken muistin. Välilehtien/laajennusten vähentäminen auttaa, mutta 8 Gt tai enemmän parantaisi tilannetta selvästi."
      }[l];
    } else if(ram<=8){
      assessment={
        en:"With 8 GB RAM, 85% is high enough to cause slowdowns, especially if Chrome, Windows and other apps are open together. Finding the heaviest Chrome tab/extension is worthwhile.",
        ru:"При 8 ГБ RAM загрузка 85% уже достаточно высокая, чтобы компьютер начал тормозить, особенно если одновременно открыты Chrome и другие программы. Стоит найти самую тяжёлую вкладку или расширение.",
        fi:"8 Gt RAM-muistilla 85 % on jo riittävän korkea aiheuttamaan hidastumista, varsinkin jos Chrome ja muita ohjelmia on auki. Raskaimman välilehden/laajennuksen etsiminen kannattaa."
      }[l];
    } else {
      assessment={
        en:`With ${ram} GB RAM, Chrome using about 1 GB is usually not alarming by itself. If total memory still reaches 85%, another program, many browser tabs, extensions, or background processes are probably contributing too.`,
        ru:`При ${ram} ГБ RAM использование Chrome около 1 ГБ само по себе обычно не выглядит критичным. Если общая память всё равно доходит до 85%, значит заметную долю также используют другие программы, множество вкладок, расширения или фоновые процессы.`,
        fi:`${ram} Gt RAM-muistilla Chromen noin 1 Gt käyttö ei yleensä yksin ole huolestuttavaa. Jos kokonaiskäyttö silti nousee 85 %:iin, myös muut ohjelmat, monet välilehdet, laajennukset tai taustaprosessit käyttävät muistia.`
      }[l];
    }

    const next={
en:`${assessment}

Now do this:
1. Press Shift + Esc inside Chrome.
2. Sort by Memory footprint.
3. Tell me the top 3 entries and roughly how much memory each one uses.

Then I can tell you what is safe to close or disable.`,
ru:`${assessment}

Теперь сделай так:
1. В Chrome нажми Shift + Esc.
2. Отсортируй по Memory footprint / памяти.
3. Напиши мне 3 верхних элемента и примерно сколько памяти использует каждый.

Тогда я смогу подсказать, что из этого безопасно закрыть или отключить.`,
fi:`${assessment}

Tee nyt näin:
1. Paina Chromessa Shift + Esc.
2. Lajittele Memory footprint -sarakkeen mukaan.
3. Kerro kolme ylintä kohtaa ja kuinka paljon muistia kukin käyttää.

Sen jälkeen voin sanoa, mitä niistä on turvallista sulkea tai poistaa käytöstä.`
    }[l];

    S.lastAnswer=next;
    S.lastQuestion="browser_memory_top3";
    return {type:"answer",text:next};
  }

  if(S.step==="browser_memory_explain" || S.step==="browser_memory_action"){
    const t=norm(text);

    if(/\b(memory saver|how.*memory saver|where.*memory saver)\b/i.test(t) ||
       /\b(экономи\w* памяти|где.*экономи\w* памяти|как.*экономи\w* памяти)\b/i.test(t) ||
       /\b(memory saver|muistinsäästö|missä.*memory saver|miten.*memory saver)\b/i.test(t)){
      const r={
en:`To enable Chrome Memory Saver:
1. Open Chrome.
2. Click ⋮ in the top-right.
3. Open Settings.
4. Open Performance.
5. Turn on Memory Saver.

Chrome can then free memory from inactive tabs and reload them when you return.`,
ru:`Чтобы включить экономию памяти Chrome:
1. Открой Chrome.
2. Нажми ⋮ справа сверху.
3. Открой «Настройки».
4. Открой «Производительность».
5. Включи «Экономия памяти / Memory Saver».

Chrome сможет освобождать память неактивных вкладок и загружать их снова, когда ты к ним вернёшься.`,
fi:`Chrome Memory Saver:
1. Avaa Chrome.
2. Napsauta oikeasta yläkulmasta ⋮.
3. Avaa Settings.
4. Avaa Performance.
5. Ota Memory Saver käyttöön.

Chrome voi vapauttaa muistia käyttämättömiltä välilehdiltä ja ladata ne uudelleen tarvittaessa.`
      }[l];
      return {type:"answer",text:r};
    }
  }

  return null;
}

function isConcreteNewQuestion(text){
  const t=norm(text);
  // Longer meaningful message containing a concrete noun/symptom should
  // not be treated as a bare follow-up "why/how".
  return wordsCount(t)>=4 &&
    /\b(browser|chrome|memory|ram|cpu|disk|printer|wifi|internet|screen|sound|браузер|память|диск|принтер|интернет|экран|звук|selain|muisti|levy|tulostin|netti|näyttö|ääni)\b/i.test(t);
}
function wordsCount(t){ return t.split(/\s+/).filter(Boolean).length; }

V.handle=function(text,l){
  const lang=langOf(text);

  // New concrete topic has priority over old contextual "why?".
  if(isBrowserMemoryQuestion(text)){
    return browserMemoryStart(text,lang);
  }

  if(V.state && V.state.issue==="browser_memory"){
    const r=browserMemoryFlow(text,lang);
    if(r) return r;
  }

  return previous(text,l);
};

window.ANITA_V12_3={
  version:"12.3",
  isBrowserMemoryQuestion
};

console.log("[ANITA v12.3] Cause + Solution Engine loaded");
})();

/* ================= ANITA v12.4 CONVERSATION MEMORY + DIRECT ANSWER =================
   Main fixes:
   1) A concrete question such as "browser take alot of memory" is answered directly.
   2) ANITA remembers the active issue and the last question/menu.
   3) Replies such as "7", "something else", "yes", "no", "done" are interpreted
      in the current conversation instead of being sent to a generic fallback.
   4) RU / EN / FI use the same conversation state.
   ================================================================================ */
(function(){
"use strict";

if(!window.ANITA_V12 || typeof window.ANITA_V12.handle!=="function") return;

const V = window.ANITA_V12;
const previous = V.handle.bind(V);
const S = V.state;

S.pendingMenu = S.pendingMenu || null;
S.lastConcreteTopic = S.lastConcreteTopic || null;
S.lastConcreteQuestion = S.lastConcreteQuestion || null;
S.lastUserMessage = S.lastUserMessage || null;

const clean = s => (s||"")
  .toLowerCase()
  .replace(/[’`]/g,"'")
  .replace(/[?!.,:;()[\]{}"“”]/g," ")
  .replace(/\s+/g," ")
  .trim();

function langOf(text){
  if(/[а-яё]/i.test(text)) return "ru";
  if(/[äöå]/i.test(text) || /\b(selain|muisti|miksi|paljon|tietokone|kone|hidas|miten)\b/i.test(text)) return "fi";
  return S.language || "en";
}

function R(l,en,ru,fi){ return l==="ru"?ru:l==="fi"?fi:en; }

function setTopic(topic, question, l){
  S.lastConcreteTopic = topic;
  S.lastConcreteQuestion = question || topic;
  S.language = l || S.language || "en";
  S.issue = topic;
}

function isBrowserMemory(text){
  const t=clean(text);
  const browser = /\b(browser|chrome|google chrome|edge|firefox|opera|brave|браузер|хром|гугл хром|эдж|selain)\b/i.test(t);
  const memory = /\b(memory|ram|память|оперативк\w*|оперативн\w*|озу|muisti)\b/i.test(t);
  const amount = /\b(take|takes|taking|use|uses|using|eat|eats|eating|consume|consumes|consuming|high|huge|much|alot|a lot|too much|жрет|жрёт|ест|использует|занимает|много|слишком|käyttää|vie|paljon|liikaa)\b/i.test(t);
  return browser && memory && amount;
}

function browserMemoryAnswer(l){
  setTopic("browser_memory","why_browser_memory",l);
  S.step="browser_memory_need_total_ram";
  S.pendingMenu=null;
  S.lastInstruction="chrome_task_manager";

  const msg=R(l,
`Yes — that can be relevant to a slow PC.

Chrome/Edge/Firefox can use a lot of RAM because every tab, extension, GPU process and some background services may run separately. About 1000 MB (1 GB) for a browser is often normal by itself. The important part is your TOTAL memory usage. If Windows is already around 85%, the PC may start using the page file on the disk, which can make it feel much slower.

Do this first:
1. In Chrome press Shift + Esc.
2. Chrome Task Manager opens.
3. Sort by “Memory footprint”.
4. Look for the heaviest tab or extension.
5. Close only the heavy item first and watch Windows Task Manager again.

Also useful:
• Chrome → Settings → Performance → turn on Memory Saver.
• Close tabs you do not need.
• Disable unused extensions.
• Restart Chrome if it has been open for a long time.
• Keep Chrome updated.

Do NOT just end random Chrome processes in Windows Task Manager — Chrome may reopen them and you can lose unsaved work.

Now tell me how much RAM the PC has in total: 4 GB, 8 GB, 16 GB, 32 GB, etc. Then I can tell you whether 85% is expected or a real bottleneck.`,
`Да — это действительно может быть связано с медленной работой ПК.

Chrome/Edge/Firefox могут использовать много RAM, потому что вкладки, расширения, GPU-процесс и фоновые службы часто работают как отдельные процессы. Около 1000 МБ (1 ГБ) для браузера само по себе часто нормально. Важнее ОБЩАЯ загрузка памяти. Если Windows уже показывает около 85%, система может начать активнее использовать файл подкачки на диске, из-за чего компьютер ощущается значительно медленнее.

Сначала сделай так:
1. В Chrome нажми Shift + Esc.
2. Откроется Диспетчер задач Chrome.
3. Отсортируй по “Memory footprint / Объём памяти”.
4. Найди самую тяжёлую вкладку или расширение.
5. Сначала закрой только этот элемент и снова посмотри память в Диспетчере задач Windows.

Также полезно:
• Chrome → Настройки → Производительность → включить Memory Saver / Экономию памяти.
• Закрыть ненужные вкладки.
• Отключить неиспользуемые расширения.
• Перезапускать Chrome, если он открыт очень долго.
• Обновить Chrome.

Не завершай случайные процессы Chrome через Диспетчер задач Windows — Chrome может открыть их снова, а несохранённые данные можно потерять.

Теперь напиши, сколько RAM установлено всего: 4 ГБ, 8 ГБ, 16 ГБ, 32 ГБ и т. д. Тогда я смогу сказать, нормально ли 85% именно для твоего ПК.`,
`Kyllä — tämä voi liittyä suoraan tietokoneen hitauteen.

Chrome/Edge/Firefox voi käyttää paljon RAM-muistia, koska välilehdet, laajennukset, GPU-prosessi ja taustapalvelut voivat toimia erillisinä prosesseina. Noin 1000 Mt (1 Gt) selaimelle voi yksin olla täysin normaalia. Tärkeämpää on KOKONAISmuistin käyttö. Jos Windows näyttää jo noin 85 %, järjestelmä voi käyttää enemmän sivutustiedostoa levyllä, jolloin kone tuntuu paljon hitaammalta.

Tee ensin näin:
1. Paina Chromessa Shift + Esc.
2. Chromen oma Tehtävienhallinta avautuu.
3. Lajittele “Memory footprint” -sarakkeen mukaan.
4. Etsi eniten muistia käyttävä välilehti tai laajennus.
5. Sulje ensin vain se ja tarkista Windowsin Tehtävienhallinnasta muistin käyttö uudelleen.

Lisäksi:
• Chrome → Settings → Performance → ota Memory Saver käyttöön.
• Sulje tarpeettomat välilehdet.
• Poista käyttämättömät laajennukset käytöstä.
• Käynnistä Chrome uudelleen, jos se on ollut pitkään auki.
• Päivitä Chrome.

Älä lopeta satunnaisia Chrome-prosesseja Windowsin Tehtävienhallinnasta — ne voivat käynnistyä uudelleen ja tallentamaton työ voi kadota.

Kerro nyt paljonko koneessa on RAM-muistia yhteensä: 4 Gt, 8 Gt, 16 Gt, 32 Gt jne. Sen perusteella voin sanoa, onko 85 % normaalia vai todellinen pullonkaula.`);
  S.lastAnswer=msg;
  S.lastQuestion="browser_memory_total_ram";
  return {type:"answer",text:msg};
}

function parseRam(text){
  const t=clean(text);
  const m=t.match(/\b(4|6|8|12|16|24|32|48|64|96|128)\s*(gb|g|гб|gt)?\b/i);
  return m ? Number(m[1]) : null;
}

function answerRam(ram,l){
  S.facts=S.facts||{};
  S.facts.totalRamGB=ram;
  S.step="browser_memory_top_processes";
  S.lastQuestion="browser_memory_top_processes";

  let assess;
  if(ram<=4) assess=R(l,
    "With only 4 GB RAM, 85% usage is very easy to reach. Windows plus a modern browser can consume nearly all available memory. Closing tabs/extensions can help, but 8 GB or more would be a meaningful upgrade.",
    "При 4 ГБ RAM загрузка 85% достигается очень легко. Windows и современный браузер могут занять почти всю память. Закрытие вкладок и расширений поможет, но переход хотя бы на 8 ГБ даст заметный эффект.",
    "4 Gt RAM-muistilla 85 % tulee helposti vastaan. Windows ja selain voivat käyttää lähes kaiken muistin. Välilehtien/laajennusten vähentäminen auttaa, mutta 8 Gt tai enemmän olisi selvä parannus.");
  else if(ram<=8) assess=R(l,
    "With 8 GB RAM, 85% is high enough to cause noticeable slowdowns. Chrome may be part of the problem, especially with many tabs/extensions or other apps open.",
    "При 8 ГБ RAM загрузка 85% уже достаточно высокая, чтобы вызывать заметные тормоза. Chrome может быть частью проблемы, особенно если открыто много вкладок/расширений или других программ.",
    "8 Gt RAM-muistilla 85 % on jo riittävän korkea aiheuttamaan hidastumista. Chrome voi olla osa ongelmaa, erityisesti jos välilehtiä/laajennuksia tai muita ohjelmia on paljon auki.");
  else assess=R(l,
    `With ${ram} GB RAM, a browser using about 1 GB is usually not a problem by itself. If total usage is still around 85%, something else is also consuming a lot of memory.`,
    `При ${ram} ГБ RAM браузер, использующий около 1 ГБ, сам по себе обычно не является проблемой. Если общая загрузка всё равно около 85%, значит много памяти использует что-то ещё.`,
    `${ram} Gt RAM-muistilla selaimen noin 1 Gt käyttö ei yleensä yksin ole ongelma. Jos kokonaiskäyttö on silti noin 85 %, jokin muu käyttää myös paljon muistia.`);

  const msg=assess + "\n\n" + R(l,
`Next step:
1. In Windows Task Manager sort by Memory.
2. Tell me the top 3 processes and their memory use.
3. In Chrome press Shift + Esc and tell me the top 3 Chrome items too.

I can then tell you which usage looks normal and what is safe to close, disable or change.`,
`Следующий шаг:
1. В Диспетчере задач Windows отсортируй процессы по Памяти.
2. Напиши 3 верхних процесса и сколько памяти использует каждый.
3. В Chrome нажми Shift + Esc и также напиши 3 верхних элемента Chrome.

Тогда я смогу сказать, какая нагрузка выглядит нормальной и что безопасно закрыть, отключить или изменить.`,
`Seuraava vaihe:
1. Lajittele Windowsin Tehtävienhallinnassa prosessit Memory-sarakkeen mukaan.
2. Kerro kolme ylintä prosessia ja niiden muistinkäyttö.
3. Paina Chromessa Shift + Esc ja kerro myös kolme ylintä Chrome-kohdetta.

Sen jälkeen voin sanoa, mikä käyttö näyttää normaalilta ja mitä voi turvallisesti sulkea, poistaa käytöstä tai muuttaa.`);
  S.lastAnswer=msg;
  return {type:"answer",text:msg};
}

function rememberMenu(topic,l){
  S.pendingMenu={topic,language:l};
  S.lastConcreteTopic=topic;
}

function handleMenuReply(text,l){
  if(!S.pendingMenu) return null;
  const t=clean(text);
  if(t==="7" || t==="something else" || t==="something different" || t==="другое" || t==="что то другое" || t==="что-то другое" || t==="jotain muuta"){
    const topic=S.pendingMenu.topic;
    S.pendingMenu=null;
    S.lastConcreteTopic=topic;
    const msg=R(l,
      `Okay — it is something else, but we are still talking about ${topic==="browser"?"the browser":"the same problem"}. Describe the symptom in your own words. You do not need to choose from the list.`,
      `Хорошо — значит это что-то другое, но мы всё ещё говорим ${topic==="browser"?"о браузере":"о той же проблеме"}. Просто опиши симптом своими словами — выбирать из списка не нужно.`,
      `Selvä — kyse on jostain muusta, mutta puhumme edelleen ${topic==="browser"?"selaimesta":"samasta ongelmasta"}. Kuvaile oire omin sanoin; listasta ei tarvitse valita.`);
    S.lastAnswer=msg;
    return {type:"answer",text:msg};
  }
  return null;
}

V.handle=function(text,l){
  const lang=langOf(text);
  S.lastUserMessage=text;

  // Concrete new intent ALWAYS has priority over an older generic browser menu.
  if(isBrowserMemory(text)){
    return browserMemoryAnswer(lang);
  }

  // Keep the browser-memory conversation alive.
  if(S.issue==="browser_memory"){
    const ram=parseRam(text);
    if(ram && (S.step==="browser_memory_need_total_ram" || S.lastQuestion==="browser_memory_total_ram")){
      return answerRam(ram,lang);
    }

    const t=clean(text);
    if(/\b(memory saver|экономи\w* памяти|muistinsäästö)\b/i.test(t)){
      const msg=R(lang,
`Chrome Memory Saver:
1. Open Chrome.
2. Click ⋮ → Settings.
3. Open Performance.
4. Turn on Memory Saver.

Inactive tabs can then release memory and reload when you return to them.`,
`Chrome Memory Saver / Экономия памяти:
1. Открой Chrome.
2. Нажми ⋮ → Настройки.
3. Открой «Производительность».
4. Включи «Экономия памяти».

Неактивные вкладки смогут освобождать память и загружаться снова, когда ты к ним вернёшься.`,
`Chrome Memory Saver:
1. Avaa Chrome.
2. Napsauta ⋮ → Settings.
3. Avaa Performance.
4. Ota Memory Saver käyttöön.

Passiiviset välilehdet voivat vapauttaa muistia ja latautua uudelleen palatessasi niihin.`);
      S.lastAnswer=msg;
      return {type:"answer",text:msg};
    }
  }

  const menu=handleMenuReply(text,lang);
  if(menu) return menu;

  // Let existing engines answer. If an old engine opens its generic browser menu,
  // remember that "7 / something else" still belongs to BROWSER.
  const r=previous(text,l);
  if(r && typeof r.text==="string"){
    const rt=clean(r.text);
    if(
      rt.includes("browser does not open") &&
      rt.includes("browser opens but pages do not load") &&
      rt.includes("something else")
    ){
      rememberMenu("browser",lang);
      S.issue="browser";
      S.lastQuestion="browser_problem_menu";
      S.lastAnswer=r.text;
    }
  }
  return r;
};

window.ANITA_V12_4={
  version:"12.4",
  isBrowserMemory
};

console.log("[ANITA v12.4] Conversation Memory + Direct Answer loaded");
})();

/* ================= ANITA v12.5 OBSERVATION vs CAUSE ENGINE =================
   Key idea:
   A user observation is NOT automatically the root cause.

   Example:
     "my pc work slow"
     "browser take alot of memory"

   Correct interpretation:
   - active problem: PC is slow
   - new observation: browser uses a lot of memory
   - possible cause: browser memory use MAY contribute
   - diagnosis must confirm whether it is actually abnormal

   RU / EN / FI.
   =========================================================================== */
(function(){
"use strict";

if(!window.ANITA_V12 || typeof window.ANITA_V12.handle!=="function") return;

const V = window.ANITA_V12;
const previous = V.handle.bind(V);
const S = V.state;

S.rootProblem = S.rootProblem || null;
S.observations = S.observations || [];
S.hypotheses = S.hypotheses || [];

const clean = s => (s||"")
  .toLowerCase()
  .replace(/[’`]/g,"'")
  .replace(/[?!.,:;()[\]{}"“”]/g," ")
  .replace(/\s+/g," ")
  .trim();

function langOf(text){
  if(/[а-яё]/i.test(text)) return "ru";
  if(/[äöå]/i.test(text) || /\b(selain|muisti|hidas|tietokone|miksi|paljon)\b/i.test(text)) return "fi";
  return S.language || "en";
}

function R(l,en,ru,fi){ return l==="ru"?ru:l==="fi"?fi:en; }

function addObservation(type,data){
  S.observations = S.observations || [];
  S.observations.push({type,data,time:Date.now()});
  if(S.observations.length>20) S.observations.shift();
}

function addHypothesis(name,confidence){
  S.hypotheses = S.hypotheses || [];
  const old=S.hypotheses.find(x=>x.name===name);
  if(old) old.confidence=confidence;
  else S.hypotheses.push({name,confidence});
}

function isSlowPc(text){
  const t=clean(text);
  const pc=/\b(pc|computer|laptop|machine|windows|компьютер|комп|пк|ноутбук|windows|tietokone|kone|läppäri)\b/i.test(t);
  const slow=/\b(slow|slowly|sluggish|laggy|lagging)\b/i.test(t) ||
             /\b(медленн\w*|тормоз\w*|лага\w*|туп\w*)\b/i.test(t) ||
             /\b(hidas|hitaasti|lagaa|hidastelee)\b/i.test(t);
  return pc && slow;
}

function isBrowserMemoryObservation(text){
  const t=clean(text);
  const browser=/\b(browser|chrome|google chrome|edge|firefox|opera|brave|браузер|хром|гугл хром|эдж|selain)\b/i.test(t);
  const memory=/\b(memory|ram|память|оперативк\w*|оперативн\w*|озу|muisti)\b/i.test(t);
  const use=/\b(take|takes|taking|use|uses|using|eat|eats|consume|consumes|high|huge|much|alot|a lot|too much|жрет|жрёт|ест|использует|занимает|много|слишком|käyttää|vie|paljon|liikaa)\b/i.test(t);
  return browser && memory && use;
}

function extractPercent(text){
  const m=String(text||"").match(/\b(\d{1,3})\s*%/);
  if(!m) return null;
  const n=Number(m[1]);
  return n>=0 && n<=100 ? n : null;
}

function extractMB(text){
  const t=clean(text);
  let m=t.match(/\b(\d{2,5})\s*(mb|мб|mt)\b/i);
  if(m) return Number(m[1]);
  m=t.match(/\b(\d+(?:\.\d+)?)\s*(gb|гб|gt)\b/i);
  if(m) return Math.round(Number(m[1])*1024);
  return null;
}

function observationAnswer(text,l){
  if(!S.rootProblem && S.issue==="slow_pc") S.rootProblem="slow_pc";
  if(!S.rootProblem) S.rootProblem="slow_pc"; // likely context, but still treated as hypothesis only

  const mb=extractMB(text);
  const pct=extractPercent(text);
  addObservation("browser_memory",{mb,totalPercent:pct,text});
  addHypothesis("browser_memory_pressure","possible");

  S.issue="slow_pc";
  S.step="slow_pc_memory_assessment";
  S.lastConcreteTopic="slow_pc";
  S.lastQuestion="total_ram_and_browser_details";
  S.lastInstruction="inspect_browser_memory";

  const amount = mb ? R(l,
    `You noticed about ${mb} MB of browser memory use.`,
    `Ты заметил, что браузер использует около ${mb} МБ памяти.`,
    `Huomasit selaimen käyttävän noin ${mb} Mt muistia.`)
    : R(l,
    `You noticed that the browser is using a lot of memory.`,
    `Ты заметил, что браузер использует много памяти.`,
    `Huomasit selaimen käyttävän paljon muistia.`);

  const msg=R(l,
`${amount}

That is an OBSERVATION, not proof that the browser is the root cause.

A browser using around 1 GB can be completely normal, depending on:
• how much RAM the PC has,
• how many tabs are open,
• what websites are open,
• extensions,
• video/web apps,
• other programs running at the same time.

What matters is whether the browser's memory use is unusually high FOR THIS PC and whether reducing it actually makes the PC faster.

Let's confirm it instead of guessing:

1. Tell me how much RAM the PC has in total: 4 GB, 8 GB, 16 GB, 32 GB, etc.
2. Tell me the total Memory percentage shown in Windows Task Manager.
3. In Chrome press Shift + Esc and tell me the top 3 items by “Memory footprint”.

Then I can tell you whether Chrome is likely the real bottleneck, only part of the problem, or probably normal.`,
`${amount}

Это НАБЛЮДЕНИЕ, а не доказательство того, что браузер является основной причиной.

Браузер, использующий около 1 ГБ, может работать совершенно нормально. Это зависит от:
• общего объёма RAM,
• количества вкладок,
• открытых сайтов,
• расширений,
• видео/веб-приложений,
• других программ, работающих одновременно.

Важно понять, много ли это ИМЕННО для этого компьютера и становится ли ПК быстрее, если уменьшить использование памяти браузером.

Давай не будем гадать, а подтвердим:

1. Напиши, сколько RAM установлено всего: 4 ГБ, 8 ГБ, 16 ГБ, 32 ГБ и т. д.
2. Напиши общий процент «Память» в Диспетчере задач Windows.
3. В Chrome нажми Shift + Esc и напиши 3 верхних элемента по “Memory footprint”.

После этого я смогу сказать: Chrome действительно является главным узким местом, только частью проблемы или его использование памяти выглядит нормальным.`,
`${amount}

Tämä on HAVAINTO, ei todiste siitä, että selain olisi varsinainen juurisyy.

Noin 1 Gt selaimen muistinkäyttö voi olla täysin normaalia. Se riippuu:
• koneen kokonais-RAM-määrästä,
• avoimien välilehtien määrästä,
• avoimista sivuista,
• laajennuksista,
• video-/web-sovelluksista,
• muista samanaikaisesti käynnissä olevista ohjelmista.

Oleellista on, onko selaimen muistinkäyttö epätavallisen suuri TÄLLÄ koneella ja nopeutuuko kone, jos selaimen muistinkäyttöä pienennetään.

Varmistetaan asia arvaamisen sijaan:

1. Kerro paljonko RAM-muistia koneessa on yhteensä: 4 Gt, 8 Gt, 16 Gt, 32 Gt jne.
2. Kerro Windowsin Tehtävienhallinnan Memory-prosentti.
3. Paina Chromessa Shift + Esc ja kerro kolme ylintä kohtaa “Memory footprint” -sarakkeesta.

Sen jälkeen voin sanoa, onko Chrome todennäköisesti varsinainen pullonkaula, vain osa ongelmaa vai täysin normaali.`);

  S.lastAnswer=msg;
  return {type:"answer",text:msg};
}

function parseRam(text){
  const t=clean(text);
  const m=t.match(/\b(4|6|8|12|16|24|32|48|64|96|128)\s*(gb|g|гб|gt)?\b/i);
  return m ? Number(m[1]) : null;
}

function assessmentFromRam(text,l){
  if(S.step!=="slow_pc_memory_assessment") return null;

  const ram=parseRam(text);
  const pct=extractPercent(text);

  if(ram) S.facts.totalRamGB=ram;
  if(pct!==null) S.facts.totalMemoryPercent=pct;

  if(!S.facts.totalRamGB || S.facts.totalMemoryPercent==null) return null;

  const r=S.facts.totalRamGB;
  const p=S.facts.totalMemoryPercent;

  let verdict;
  if(r<=4 && p>=75){
    verdict=R(l,
      `With ${r} GB RAM and ${p}% memory use, RAM pressure is very likely contributing to the slowdown.`,
      `При ${r} ГБ RAM и загрузке памяти ${p}% нехватка RAM очень вероятно влияет на тормоза.`,
      `${r} Gt RAM-muistilla ja ${p}% muistinkäytöllä muistipaine todennäköisesti hidastaa konetta.`);
    addHypothesis("memory_pressure","likely");
  } else if(r<=8 && p>=80){
    verdict=R(l,
      `With ${r} GB RAM and ${p}% memory use, memory pressure is a plausible cause of the slowdown, but we still need to see which processes are using it.`,
      `При ${r} ГБ RAM и загрузке ${p}% нехватка памяти вполне может быть причиной тормозов, но нужно ещё увидеть, какие процессы её используют.`,
      `${r} Gt RAM-muistilla ja ${p}% käytöllä muistipaine voi hyvin hidastaa konetta, mutta meidän pitää vielä nähdä mitkä prosessit käyttävät muistia.`);
    addHypothesis("memory_pressure","probable");
  } else if(r>=16 && p>=80){
    verdict=R(l,
      `With ${r} GB RAM, ${p}% total usage is high. Chrome using about 1 GB alone would usually not explain that, so another app, many tabs, extensions, or background processes are probably also involved.`,
      `При ${r} ГБ RAM общая загрузка ${p}% высокая. Один Chrome с примерно 1 ГБ обычно не объясняет такую загрузку, значит память также используют другие программы, множество вкладок, расширения или фоновые процессы.`,
      `${r} Gt RAM-muistilla ${p}% kokonaiskäyttö on korkea. Pelkkä Chromen noin 1 Gt ei yleensä selitä sitä, joten myös muut ohjelmat, monet välilehdet, laajennukset tai taustaprosessit käyttävät muistia.`);
    addHypothesis("browser_memory_pressure","partial");
  } else {
    verdict=R(l,
      `Those numbers do not prove that Chrome is the main cause yet.`,
      `Эти цифры пока не доказывают, что Chrome является главной причиной.`,
      `Nämä luvut eivät vielä todista, että Chrome olisi pääsyy.`);
  }

  S.step="slow_pc_memory_top_processes";
  S.lastQuestion="top_memory_processes";

  const msg=verdict+"\n\n"+R(l,
`Next, sort Windows Task Manager by Memory and tell me the top 3 processes. Also press Shift + Esc in Chrome and tell me the top 3 Chrome items. Then we can decide what is safe to close or change.`,
`Теперь отсортируй Диспетчер задач Windows по Памяти и напиши 3 верхних процесса. Также нажми Shift + Esc в Chrome и напиши 3 верхних элемента Chrome. После этого можно будет понять, что безопасно закрыть или изменить.`,
`Lajittele nyt Windowsin Tehtävienhallinta Memory-sarakkeen mukaan ja kerro kolme ylintä prosessia. Paina lisäksi Chromessa Shift + Esc ja kerro kolme ylintä Chrome-kohdetta. Sen jälkeen voidaan päättää, mitä on turvallista sulkea tai muuttaa.`);
  S.lastAnswer=msg;
  return {type:"answer",text:msg};
}

V.handle=function(text,l){
  const lang=langOf(text);

  if(isSlowPc(text)){
    S.rootProblem="slow_pc";
  }

  // While troubleshooting a slow PC, this phrase is an observation/evidence,
  // not automatically a new "browser problem".
  if(isBrowserMemoryObservation(text) && (S.rootProblem==="slow_pc" || S.issue==="slow_pc" || S.issue==="browser_memory")){
    return observationAnswer(text,lang);
  }

  if(S.rootProblem==="slow_pc" && S.step==="slow_pc_memory_assessment"){
    const r=assessmentFromRam(text,lang);
    if(r) return r;
  }

  return previous(text,l);
};

window.ANITA_V12_5={
  version:"12.5",
  isBrowserMemoryObservation
};

console.log("[ANITA v12.5] Observation vs Cause Engine loaded");
})();

/* ================= ANITA v12.6 MENU MEMORY FIX =================
   Remembers numbered clarification menus.
   "7" and "Something else" remain attached to the menu that ANITA asked.
   Also supports 1..6 for the generic weird/glitch and browser menus.
   RU / EN / FI.
   ================================================================= */
(function(){
"use strict";
if(!window.ANITA_V12 || typeof window.ANITA_V12.handle!=="function") return;

const V=window.ANITA_V12;
const old=V.handle.bind(V);
const S=V.state;
S.activeChoiceMenu=S.activeChoiceMenu||null;

const clean=s=>(s||"").toLowerCase()
 .replace(/[’`]/g,"'")
 .replace(/[?!.,:;()[\]{}"“”]/g," ")
 .replace(/\s+/g," ").trim();

function lang(text){
 if(/[а-яё]/i.test(text)) return "ru";
 if(/[äöå]/i.test(text)||/\b(jotain muuta|selain|näyttö|ohjelma|hidas)\b/i.test(text)) return "fi";
 return S.language||"en";
}
function R(l,en,ru,fi){return l==="ru"?ru:l==="fi"?fi:en;}

function detectMenu(answerText){
 const t=clean(answerText);
 if(
   t.includes("screen graphics problem") &&
   t.includes("programs freeze") &&
   t.includes("computer is slow") &&
   t.includes("something else")
 ) return "weird";
 if(
   t.includes("browser does not open") &&
   t.includes("browser opens but pages do not load") &&
   t.includes("something else")
 ) return "browser";
 return null;
}

function choice(text){
 const t=clean(text);
 if(/^[1-7]$/.test(t)) return Number(t);
 if(["something else","something different","other","другое","что то другое","что-то другое","jotain muuta","muu"].includes(t)) return 7;
 return null;
}

function askOwnWords(menu,l){
 S.activeChoiceMenu=null;
 S.lastQuestion=menu+"_other_description";
 S.step=menu+"_other_description";
 const msg=R(l,
   menu==="browser"
   ? "Okay — we are still talking about the browser, but your symptom is not in my list. Describe exactly what you noticed in your own words. For example: “Chrome uses 1 GB of memory”, “video stutters”, or “pages use a lot of CPU”."
   : "Okay — we are still talking about the same PC/Windows problem, but none of those options match. Describe exactly what you notice in your own words. I will keep the current problem context.",
   menu==="browser"
   ? "Хорошо — мы всё ещё говорим о браузере, но твоего симптома нет в списке. Просто опиши своими словами, что именно заметил. Например: «Chrome использует 1 ГБ памяти», «видео дёргается» или «страницы сильно грузят CPU»."
   : "Хорошо — мы всё ещё говорим о той же проблеме ПК/Windows, но ни один вариант не подходит. Опиши своими словами, что именно происходит. Я сохраню контекст текущей проблемы.",
   menu==="browser"
   ? "Selvä — puhumme edelleen selaimesta, mutta oireesi ei ole listassa. Kuvaile omin sanoin mitä huomasit. Esimerkiksi: “Chrome käyttää 1 Gt muistia”, “video pätkii” tai “sivut käyttävät paljon CPU:ta”."
   : "Selvä — puhumme edelleen samasta PC/Windows-ongelmasta, mutta mikään vaihtoehto ei sovi. Kuvaile omin sanoin mitä tapahtuu. Säilytän nykyisen ongelman kontekstin."
 );
 S.lastAnswer=msg;
 return {type:"answer",text:msg};
}

function handleWeird(n,l){
 S.activeChoiceMenu=null;
 if(n===1){
   S.issue="display"; S.step="display_detect";
   return {type:"answer",text:R(l,
    "Understood — this is a screen/graphics symptom. Is the screen flickering, showing artifacts, going black, or showing “No signal”?",
    "Понял — проблема связана с экраном/графикой. Экран мерцает, показывает артефакты, становится чёрным или пишет «Нет сигнала»?",
    "Selvä — oire liittyy näyttöön/grafiikkaan. Välkkyykö näyttö, näkyykö artefakteja, meneekö se mustaksi vai näkyykö “No signal”?")};
 }
 if(n===2){
   S.issue="freeze"; S.step="freeze_scope";
   return {type:"answer",text:R(l,
    "Understood — programs are freezing. Does only one program freeze, or does the whole computer stop responding?",
    "Понял — программы зависают. Зависает только одна программа или перестаёт отвечать весь компьютер?",
    "Selvä — ohjelmat jäätyvät. Jäätyykö vain yksi ohjelma vai lakkaako koko tietokone vastaamasta?")};
 }
 if(n===3){
   S.issue="slow_pc"; S.rootProblem="slow_pc"; S.step="slow_task_manager"; S.lastInstruction="slow_task_manager";
   return {type:"answer",text:R(l,
    "Understood — the concrete symptom is slowness. Press Ctrl + Shift + Esc and tell me which is highest: CPU, Memory or Disk, plus the percentage.",
    "Понял — конкретный симптом: компьютер работает медленно. Нажми Ctrl + Shift + Esc и напиши, что загружено сильнее: CPU, Память или Диск, и процент.",
    "Selvä — konkreettinen oire on hitaus. Paina Ctrl + Shift + Esc ja kerro mikä on korkein: CPU, Memory vai Disk sekä prosentti.")};
 }
 if(n===4){
   S.issue="windows_error"; S.step="error_text";
   return {type:"answer",text:R(l,
    "Understood — there are error messages/popups. Please type the exact error text or code you see. A screenshot is also useful.",
    "Понял — появляются ошибки или всплывающие окна. Напиши точный текст или код ошибки. Скриншот тоже подойдёт.",
    "Selvä — näkyviin tulee virheilmoituksia/ponnahdusikkunoita. Kirjoita tarkka virheteksti tai koodi. Kuvakaappauskin auttaa.")};
 }
 if(n===5){
   S.issue="input"; S.step="input_scope";
   return {type:"answer",text:R(l,
    "Understood — this is a mouse/keyboard issue. Which device behaves incorrectly, and what exactly does it do?",
    "Понял — проблема с мышью или клавиатурой. Какое устройство работает неправильно и что именно происходит?",
    "Selvä — ongelma liittyy hiireen tai näppäimistöön. Kumpi toimii väärin ja mitä tarkalleen tapahtuu?")};
 }
 if(n===6){
   S.issue="windows_shell"; S.step="shell_scope";
   return {type:"answer",text:R(l,
    "Understood — this concerns Explorer/taskbar/Start. Which one stops responding: File Explorer, taskbar, Start menu, or several of them?",
    "Понял — проблема с Проводником/панелью задач/Пуском. Что именно перестаёт отвечать: Проводник, панель задач, меню Пуск или несколько элементов?",
    "Selvä — ongelma koskee Resurssienhallintaa/tehtäväpalkkia/Käynnistä-valikkoa. Mikä niistä lakkaa vastaamasta?")};
 }
 return askOwnWords("weird",l);
}

function handleBrowser(n,l){
 S.activeChoiceMenu=null;
 const prompts={
  1:["The browser does not open at all. Which browser is it, and what happens when you try to start it?",
     "Браузер вообще не открывается. Какой это браузер и что происходит при попытке запуска?",
     "Selain ei avaudu lainkaan. Mikä selain se on ja mitä tapahtuu kun yrität käynnistää sen?"],
  2:["The browser opens but pages do not load. Do other devices on the same Wi-Fi have Internet?",
     "Браузер открывается, но страницы не загружаются. Интернет работает на других устройствах в той же Wi‑Fi сети?",
     "Selain avautuu mutta sivut eivät lataudu. Toimiiko internet muilla saman Wi‑Fi-verkon laitteilla?"],
  3:["A page starts loading and then stops. Does this happen on every website or only some websites?",
     "Страница начинает загружаться и останавливается. Это происходит на всех сайтах или только на некоторых?",
     "Sivu alkaa latautua ja pysähtyy. Tapahtuuko tämä kaikilla sivuilla vai vain joillakin?"],
  4:["The browser itself is slow. Is the whole PC also slow, or only the browser?",
     "Сам браузер работает медленно. Весь компьютер тоже тормозит или только браузер?",
     "Selain on hidas. Onko koko tietokone myös hidas vai vain selain?"],
  5:["The browser freezes/crashes. Which browser is it, and does it freeze or close completely?",
     "Браузер зависает/вылетает. Какой это браузер, и он зависает или полностью закрывается?",
     "Selain jäätyy/kaatuu. Mikä selain se on, ja jäätyykö se vai sulkeutuuko kokonaan?"],
  6:["Downloads do not work. What happens when you click Download: nothing, an error, or the download starts and fails?",
     "Не работают загрузки. Что происходит после нажатия Download: ничего, ошибка или загрузка начинается и прерывается?",
     "Lataukset eivät toimi. Mitä tapahtuu kun painat Download: ei mitään, virhe vai alkaako lataus ja epäonnistuu?"]
 };
 if(n===7) return askOwnWords("browser",l);
 const p=prompts[n];
 if(!p) return null;
 S.issue="browser"; S.step="browser_choice_"+n; S.lastQuestion="browser_choice_"+n;
 const msg=R(l,p[0],p[1],p[2]); S.lastAnswer=msg;
 return {type:"answer",text:msg};
}

V.handle=function(text,l){
 const L=lang(text);
 const n=choice(text);

 // If ANITA has an active menu, short answers belong to THAT menu.
 if(S.activeChoiceMenu && n){
   return S.activeChoiceMenu==="weird" ? handleWeird(n,L) : handleBrowser(n,L);
 }

 const r=old(text,l);

 // Remember menus produced by any older layer.
 if(r && typeof r.text==="string"){
   const menu=detectMenu(r.text);
   if(menu){
     S.activeChoiceMenu=menu;
     S.lastQuestion=menu+"_choice_menu";
   }
 }
 return r;
};

window.ANITA_V12_6={version:"12.6"};
console.log("[ANITA v12.6] Menu Memory Fix loaded");
})();

/* ================= ANITA v12.7 CONTINUITY + ESCALATION ENGINE =================
   Fixes:
   - "i see memory 85%" continues the active slow-PC diagnosis.
   - "1 / 2 / 3" can answer CPU / Memory / Disk when ANITA asked which is highest.
   - "what to do?" means "what do I do about THIS current problem?"
   - "can you help with this?" keeps the same context instead of generic fallback.
   - after repeated failed troubleshooting, ANITA offers real IT support and
     can open the existing Contact a specialist cards via showHuman().
   - EN / RU / FI share the same state.
   ============================================================================== */
(function(){
"use strict";

if(!window.ANITA_V12 || typeof window.ANITA_V12.handle!=="function") return;

const V=window.ANITA_V12;
const old=V.handle.bind(V);
const S=V.state;

S.supportFailures = S.supportFailures || 0;
S.currentSymptom = S.currentSymptom || null;
S.currentFinding = S.currentFinding || null;
S.awaitingResourcePercent = S.awaitingResourcePercent || null;

const clean=s=>(s||"").toLowerCase()
 .replace(/[’`]/g,"'")
 .replace(/[?!.,:;()[\]{}"“”]/g," ")
 .replace(/\s+/g," ").trim();

function L(text){
 if(/[а-яё]/i.test(text)) return "ru";
 if(/[äöå]/i.test(text) || /\b(muisti|levy|prosessori|mitä teen|voitko auttaa|tietokone)\b/i.test(text)) return "fi";
 return S.language || "en";
}
function R(l,en,ru,fi){return l==="ru"?ru:l==="fi"?fi:en;}

function pct(text){
 const m=String(text||"").match(/\b(\d{1,3})\s*%/);
 if(!m) return null;
 const n=Number(m[1]);
 return n>=0 && n<=100 ? n : null;
}

function resource(text){
 const t=clean(text);
 if(t==="1" || /\b(cpu|processor|цп|процессор|prosessori)\b/i.test(t)) return "cpu";
 if(t==="2" || /\b(memory|ram|память|озу|muisti)\b/i.test(t)) return "memory";
 if(t==="3" || /\b(disk|drive|диск|levy)\b/i.test(t)) return "disk";
 return null;
}

function isSlowContext(){
 return S.rootProblem==="slow_pc" || S.issue==="slow_pc" ||
        S.currentSymptom==="slow_pc" ||
        S.step==="slow_task_manager" ||
        S.step==="slow_resource_percent" ||
        S.step==="slow_memory_investigation";
}

function looksLikeSlowStart(text){
 const t=clean(text);
 return /\b(pc|computer|laptop|machine|windows|компьютер|комп|пк|ноут|tietokone|kone|läppäri)\b/i.test(t)
     && (/\b(slow|slowly|laggy|sluggish)\b/i.test(t) ||
         /\b(медленн\w*|тормоз\w*|лага\w*|туп\w*)\b/i.test(t) ||
         /\b(hidas|hitaasti|lagaa)\b/i.test(t));
}

function looksLikeMemoryFinding(text){
 const t=clean(text);
 return /\b(memory|ram|память|озу|muisti)\b/i.test(t) && pct(text)!==null;
}

function adviceQuestion(text){
 const t=clean(text);
 return [
   "what to do","what do i do","what should i do","what can i do","how to fix it",
   "how do i fix it","how can i fix it","what now","what next",
   "что делать","что мне делать","как исправить","как это исправить","что дальше",
   "mitä teen","mitä pitäisi tehdä","miten korjaan","mitä seuraavaksi"
 ].includes(t);
}

function canYouHelp(text){
 const t=clean(text);
 return [
   "can you help with this","can you help me with this","can you help","help me with this",
   "ты можешь помочь","можешь помочь с этим","поможешь с этим","можешь помочь",
   "voitko auttaa","voitko auttaa tässä","autatko tässä"
 ].includes(t);
}

function wantsHuman(text){
 const t=clean(text);
 return /\b(contact|human|specialist|technician|it support|real person|service)\b/i.test(t) ||
        /\b(специалист|мастер|человек|техподдержк|сервис|айти поддержк)\b/i.test(t) ||
        /\b(asiantuntija|ihminen|it tuki|it-tuki|huolto|tuki)\b/i.test(t);
}

function showHumanSoon(l){
 try{
   if(typeof showHuman==="function") setTimeout(()=>showHuman(l),0);
 }catch(e){}
}

function setSlow(){
 S.rootProblem="slow_pc";
 S.issue="slow_pc";
 S.currentSymptom="slow_pc";
}

function askPercent(res,l){
 setSlow();
 S.awaitingResourcePercent=res;
 S.step="slow_resource_percent";
 S.facts=S.facts||{};
 S.facts.highResource=res;
 const name=res==="cpu" ? R(l,"CPU","CPU/процессор","CPU/prosessori")
   : res==="memory" ? R(l,"Memory","Память","Memory/muisti")
   : R(l,"Disk","Диск","Disk/levy");

 const msg=R(l,
 `Okay — ${name} is the highest. What percentage does it show? For example: “85%”.`,
 `Хорошо — сильнее всего загружен ${name}. Какой процент он показывает? Например: «85%».`,
 `Selvä — ${name} on korkein. Kuinka monta prosenttia se näyttää? Esimerkiksi “85 %”.`);
 S.lastQuestion="slow_resource_percent";
 S.lastAnswer=msg;
 return {type:"answer",text:msg};
}

function memory85Answer(p,l){
 setSlow();
 S.currentFinding={type:"memory_percent",value:p};
 S.facts=S.facts||{};
 S.facts.totalMemoryPercent=p;
 S.step="slow_memory_investigation";
 S.lastInstruction="slow_memory_investigation";
 S.lastQuestion="slow_memory_top_process";
 S.supportFailures=0;

 const severity = p>=90 ? R(l,
   "That is very high memory usage.",
   "Это очень высокая загрузка памяти.",
   "Muistinkäyttö on erittäin korkea.")
 : p>=80 ? R(l,
   "That is high enough to contribute to the slowdown.",
   "Это достаточно высокая загрузка памяти, чтобы она могла вызывать тормоза.",
   "Se on riittävän korkea voidakseen hidastaa konetta.")
 : R(l,
   "That is elevated, but we still need to see what is using it.",
   "Память заметно загружена, но нужно увидеть, что именно её использует.",
   "Muistinkäyttö on koholla, mutta meidän pitää nähdä mikä sitä käyttää.");

 const msg=R(l,
`Memory is at ${p}%. ${severity}

This does NOT automatically mean the RAM itself is faulty. It usually means Windows and running programs are using most of the available memory.

Let's find the cause:

1. Stay in Windows Task Manager.
2. Click the “Memory” column so the biggest users are at the top.
3. Tell me the top 3 processes and roughly how much memory each uses.
   Example: Chrome 1000 MB, Discord 450 MB, Antimalware Service 300 MB.
4. Also tell me how much RAM the PC has in total: 4 GB, 8 GB, 16 GB, etc.

Then I can tell you what looks normal, what can be closed/disabled safely, and whether you may actually need more RAM.`,
`Память загружена на ${p}%. ${severity}

Это НЕ означает автоматически, что сама RAM неисправна. Обычно это значит, что Windows и запущенные программы используют большую часть доступной оперативной памяти.

Давай найдём причину:

1. Останься в Диспетчере задач Windows.
2. Нажми столбец «Память», чтобы самые тяжёлые процессы оказались сверху.
3. Напиши 3 верхних процесса и примерно сколько памяти использует каждый.
   Например: Chrome 1000 МБ, Discord 450 МБ, Antimalware Service 300 МБ.
4. Также напиши, сколько RAM установлено всего: 4 ГБ, 8 ГБ, 16 ГБ и т. д.

После этого я смогу сказать, что выглядит нормально, что можно безопасно закрыть/отключить и действительно ли может понадобиться больше RAM.`,
`Muistia käytetään ${p} %. ${severity}

Tämä EI automaattisesti tarkoita, että RAM olisi viallinen. Yleensä Windows ja käynnissä olevat ohjelmat käyttävät suurimman osan käytettävissä olevasta muistista.

Selvitetään syy:

1. Pysy Windowsin Tehtävienhallinnassa.
2. Napsauta “Memory”-saraketta, jotta suurimmat käyttäjät ovat ylimpänä.
3. Kerro kolme ylintä prosessia ja suunnilleen paljonko muistia kukin käyttää.
   Esimerkiksi: Chrome 1000 Mt, Discord 450 Mt, Antimalware Service 300 Mt.
4. Kerro myös koneen RAM-muistin kokonaismäärä: 4 Gt, 8 Gt, 16 Gt jne.

Sen jälkeen voin sanoa, mikä näyttää normaalilta, mitä voi turvallisesti sulkea/poistaa käytöstä ja tarvitaanko mahdollisesti lisää RAM-muistia.`);
 S.lastAnswer=msg;
 return {type:"answer",text:msg};
}

function currentAdvice(l){
 if(isSlowContext() && S.facts && S.facts.totalMemoryPercent!=null){
   const p=S.facts.totalMemoryPercent;
   return memory85Answer(p,l);
 }
 if(isSlowContext()){
   const msg=R(l,
`Yes. We are still troubleshooting the slow PC.

If Task Manager is open, tell me which is highest: CPU, Memory, or Disk — and the percentage. I will use that result to choose the next step.`,
`Да. Мы всё ещё разбираемся, почему компьютер тормозит.

Если Диспетчер задач открыт, напиши, что загружено сильнее всего: CPU, Память или Диск — и процент. По этому результату я выберу следующий шаг.`,
`Kyllä. Selvitämme edelleen miksi tietokone on hidas.

Jos Tehtävienhallinta on auki, kerro mikä on korkein: CPU, Memory vai Disk — sekä prosentti. Valitsen seuraavan vaiheen sen perusteella.`);
   S.lastAnswer=msg;
   return {type:"answer",text:msg};
 }
 return null;
}

function helpCurrent(l){
 if(isSlowContext()){
   const msg=R(l,
`Yes — I can continue with this exact problem. We are troubleshooting your slow PC, not starting a new topic.

${S.facts && S.facts.totalMemoryPercent!=null
? `You reported Memory at ${S.facts.totalMemoryPercent}%. The next useful step is to sort Task Manager by Memory and send me the top 3 processes plus your total installed RAM.`
: `Tell me the Task Manager result: CPU, Memory or Disk, and its percentage.`}

If the steps become too technical, do not solve it, or you prefer a person to check the computer, press “Contact a specialist” below and I can show real IT-support contacts.`,
`Да — я могу продолжить именно эту проблему. Мы всё ещё диагностируем медленную работу твоего ПК, а не начинаем новую тему.

${S.facts && S.facts.totalMemoryPercent!=null
? `Ты сообщил, что Память загружена на ${S.facts.totalMemoryPercent}%. Следующий полезный шаг — отсортировать Диспетчер задач по Памяти и прислать 3 верхних процесса плюс общий объём установленной RAM.`
: `Напиши результат Диспетчера задач: CPU, Память или Диск и процент.`}

Если действия окажутся слишком сложными, не помогут или ты хочешь, чтобы компьютер проверил человек, нажми кнопку «Contact a specialist» ниже — я покажу контакты реальных IT‑специалистов.`,
`Kyllä — voin jatkaa juuri tämän ongelman kanssa. Selvitämme edelleen hidasta tietokonetta emmekä aloita uutta aihetta.

${S.facts && S.facts.totalMemoryPercent!=null
? `Kerroit Memory-käytön olevan ${S.facts.totalMemoryPercent} %. Seuraava hyödyllinen vaihe on lajitella Tehtävienhallinta Memory-sarakkeen mukaan ja kertoa kolme ylintä prosessia sekä RAM-muistin kokonaismäärä.`
: `Kerro Tehtävienhallinnan tulos: CPU, Memory tai Disk ja prosentti.`}

Jos vaiheet ovat liian teknisiä, eivät auta tai haluat ihmisen tarkistamaan koneen, paina alla olevaa “Contact a specialist” -painiketta, niin näytän oikeat IT-tukikontaktit.`);
   S.lastAnswer=msg;
   return {type:"answer",text:msg};
 }
 return null;
}

function escalation(l){
 const msg=R(l,
`I can keep helping, but at this point a real IT specialist is also a good option — especially if the PC remains slow after the checks or you do not want to change settings yourself.

Press “Contact a specialist” below. I’ll show the available IT-support contacts.`,
`Я могу продолжить помогать, но на этом этапе реальный IT‑специалист тоже будет хорошим вариантом — особенно если ПК продолжает тормозить после проверок или ты не хочешь менять настройки самостоятельно.

Нажми «Contact a specialist» ниже. Я покажу доступные контакты IT‑поддержки.`,
`Voin jatkaa auttamista, mutta tässä vaiheessa oikea IT-asiantuntija on myös hyvä vaihtoehto — etenkin jos kone on edelleen hidas tarkistusten jälkeen tai et halua muuttaa asetuksia itse.

Paina alla “Contact a specialist”. Näytän saatavilla olevat IT-tukikontaktit.`);
 S.lastAnswer=msg;
 showHumanSoon(l);
 return {type:"answer",text:msg};
}

V.handle=function(text,l){
 const language=L(text);
 const t=clean(text);

 if(looksLikeSlowStart(text)){
   S.rootProblem="slow_pc";
   S.currentSymptom="slow_pc";
 }

 // Explicit request for a human / specialist.
 if(wantsHuman(text)) return escalation(language);

 // "1 / 2 / 3" after the slow-PC Task Manager question.
 if(isSlowContext() && S.step==="slow_task_manager"){
   const r=resource(text);
   if(r) return askPercent(r,language);
 }

 // Concrete "Memory 85%" / "I see memory 85%" must be diagnostic evidence,
 // not a dictionary request for the definition of RAM.
 if(isSlowContext() && looksLikeMemoryFinding(text)){
   return memory85Answer(pct(text),language);
 }

 // If ANITA already knows which resource and user replies only with "85%".
 if(isSlowContext() && S.awaitingResourcePercent && pct(text)!==null){
   const r=S.awaitingResourcePercent;
   S.awaitingResourcePercent=null;
   if(r==="memory") return memory85Answer(pct(text),language);
   // Let existing detailed CPU/Disk branches handle richer replies later.
   S.facts=S.facts||{};
   S.facts.highResource=r;
   S.facts.highResourcePercent=pct(text);
   const msg=R(language,
     `${r.toUpperCase()} is at ${pct(text)}%. Tell me which process is at the top when you sort Task Manager by ${r==="cpu"?"CPU":"Disk"}.`,
     `${r==="cpu"?"CPU":"Диск"} загружен на ${pct(text)}%. Отсортируй Диспетчер задач по ${r==="cpu"?"CPU":"Диску"} и напиши, какой процесс находится сверху.`,
     `${r==="cpu"?"CPU":"Disk"} on ${pct(text)} %. Lajittele Tehtävienhallinta sen mukaan ja kerro mikä prosessi on ylimpänä.`);
   S.lastAnswer=msg;
   return {type:"answer",text:msg};
 }

 // "What to do?" means current-context advice.
 if(adviceQuestion(text)){
   const r=currentAdvice(language);
   if(r) return r;
 }

 // "Can you help with this?" must preserve the current issue.
 if(canYouHelp(text)){
   const r=helpCurrent(language);
   if(r) return r;
 }

 // Count explicit failure language in a live troubleshooting session.
 if(isSlowContext() && /\b(still|didn t help|didnt help|not fixed|same problem|не помог|всё ещё|все еще|не изменилось|ei auttanut|ei vieläkään)\b/i.test(t)){
   S.supportFailures=(S.supportFailures||0)+1;
   if(S.supportFailures>=2) return escalation(language);
 }

 const out=old(text,l);
 return out;
};

window.ANITA_V12_7={version:"12.7"};
console.log("[ANITA v12.7] Continuity + Escalation Engine loaded");
})();

/* ================= ANITA v12.8 SUCCESS FEEDBACK ENGINE =================
   Purpose:
   - Detect genuine SUCCESS after troubleshooting.
   - Reply positively only when the result is clearly positive.
   - Never confuse "didn't work", "still not working", etc. with success.
   - Supports many natural EN / RU / FI success phrases.
   - Keeps the current troubleshooting context, then marks the branch solved.
   ======================================================================= */
(function(){
"use strict";

if(!window.ANITA_V12 || typeof window.ANITA_V12.handle!=="function") return;

const V = window.ANITA_V12;
const old = V.handle.bind(V);
const S = V.state;

S.successReplyIndex = S.successReplyIndex || 0;
S.lastSolvedIssue = S.lastSolvedIssue || null;

const clean = s => (s||"")
  .toLowerCase()
  .replace(/[’`]/g,"'")
  .replace(/[?!.,:;()[\]{}"“”]/g," ")
  .replace(/\s+/g," ")
  .trim();

function langOf(text){
  if(/[а-яё]/i.test(text)) return "ru";
  if(/[äöå]/i.test(text) || /\b(toimii|onnistui|hyvä|jes|mahtavaa|kiitos)\b/i.test(text)) return "fi";
  return S.language || "en";
}

/* IMPORTANT:
   Negative patterns are checked FIRST, because phrases like
   "it worked for a second but now it doesn't"
   contain the word "worked" but are NOT success.
*/
function isNegativeOutcome(text){
  const t = clean(text);

  const negatives = [
    // EN
    "didn't work","didnt work","doesn't work","doesnt work","not working",
    "still not working","still doesn't work","still doesnt work",
    "did not help","didn't help","didnt help","not fixed","still broken",
    "same problem","nothing changed","worked for a second but",
    "worked briefly but","it stopped working again","problem came back",

    // RU
    "не сработало","не работает","всё ещё не работает","все еще не работает",
    "не помогло","ничего не изменилось","та же проблема","всё так же","все так же",
    "заработало но снова","снова не работает","опять не работает","проблема вернулась",

    // FI
    "ei toimi","ei auttanut","ei vieläkään toimi","sama ongelma",
    "mikään ei muuttunut","toimi hetken mutta","lakkasi taas toimimasta",
    "ongelma palasi"
  ];

  return negatives.some(x => t.includes(clean(x)));
}

function isSuccessOutcome(text){
  if(isNegativeOutcome(text)) return false;

  const t = clean(text);

  // Exact / common conversational success forms.
  const exact = [
    // EN
    "it worked","it works","works now","working now","now it works",
    "yes it worked","yes it works","yeah it worked","yeah it works",
    "yep it worked","yep it works","that worked","this worked",
    "fixed","fixed it","it's fixed","its fixed","problem solved",
    "solved","all good","good now","everything works","everything works now",
    "wow it worked","wow it works","nice it worked","great it worked",
    "perfect it works","awesome it works","finally it works","finally fixed",
    "that fixed it","this fixed it","it is working","back to normal",
    "normal now","much better now","better now","pc is fast now",

    // RU
    "заработало","работает","теперь работает","да заработало","да работает",
    "всё работает","все работает","починилось","исправилось","готово работает",
    "проблема решена","решено","всё хорошо","все хорошо","теперь всё хорошо",
    "теперь все хорошо","вау заработало","ого заработало","отлично работает",
    "наконец заработало","стало нормально","теперь нормально","стало быстрее",
    "компьютер стал быстрее","теперь быстро",

    // FI
    "toimii","se toimii","nyt toimii","kyllä toimii","joo toimii",
    "onnistui","se onnistui","korjattu","ongelma ratkesi","ratkesi",
    "kaikki toimii","nyt kaikki toimii","hyvä nyt","mahtavaa toimii",
    "jes toimii","vihdoin toimii","nyt on kunnossa","palasi normaaliksi",
    "nyt nopeampi"
  ];

  if(exact.includes(t)) return true;

  // More flexible patterns.
  const patterns = [
    /\b(it|that|this|everything|pc|computer|chrome|browser) (now )?(works|worked|is working)\b/i,
    /\b(now|finally) (it )?(works|worked|is working)\b/i,
    /\b(fixed|solved|working) now\b/i,
    /\b(that|this) fixed (it|the problem)\b/i,

    /\b(теперь|наконец)? ?(это |всё |все )?(работает|заработало|починилось|исправилось)\b/i,
    /\b(проблема )?(решена|решилась)\b/i,
    /\b(стало|теперь) (быстрее|нормально)\b/i,

    /\b(nyt|vihdoin)? ?(se |kaikki )?(toimii|onnistui|korjaantui)\b/i,
    /\b(ongelma )?(ratkesi|korjaantui)\b/i,
    /\b(nyt )?(nopeampi|kunnossa)\b/i
  ];

  return patterns.some(r => r.test(t));
}

const SUCCESS_REPLIES = {
  en: [
    "Great! Glad that worked 😊",
    "Nice — that fixed it. Good job!",
    "Perfect! The problem is solved.",
    "Awesome — happy to help!",
    "Good! That means we found the right cause.",
    "Excellent — your PC should feel better now.",
    "Great result! You handled that perfectly.",
    "Nice one — that step did the trick.",
    "Perfect, we're back in business 😊",
    "Great! I'm glad we got it working.",
    "Excellent. That confirms the troubleshooting worked.",
    "Good job! The issue appears to be resolved."
  ],
  ru: [
    "Отлично! Рад, что помогло 😊",
    "Супер — значит мы нашли правильную причину.",
    "Отлично, проблема решена!",
    "Хорошая работа! Всё получилось.",
    "Прекрасно — значит этот шаг действительно помог.",
    "Супер! Теперь компьютер должен работать лучше.",
    "Отличный результат 😊",
    "Хорошо! Значит диагностика была правильной.",
    "Отлично, снова всё работает.",
    "Супер — рад был помочь!",
    "Отлично! Можно считать эту проблему решённой.",
    "Хорошая работа — похоже, всё исправлено."
  ],
  fi: [
    "Hienoa! Mukava kuulla, että se auttoi 😊",
    "Mahtavaa — löysimme oikean syyn.",
    "Hyvä! Ongelma näyttää olevan ratkaistu.",
    "Loistavaa työtä!",
    "Hienoa — tuo vaihe todella auttoi.",
    "Mahtavaa! Koneen pitäisi nyt toimia paremmin.",
    "Erinomainen tulos 😊",
    "Hyvä! Vianmääritys osui oikeaan.",
    "Hienoa, nyt se toimii taas.",
    "Mahtavaa — autoin mielelläni!",
    "Hyvä! Voimme pitää tätä ongelmaa ratkaistuna.",
    "Loistavaa — näyttää siltä, että vika korjaantui."
  ]
};

function successReply(text){
  const l = langOf(text);
  const replies = SUCCESS_REPLIES[l] || SUCCESS_REPLIES.en;

  // Rotate replies so ANITA does not say exactly the same thing every time.
  const i = S.successReplyIndex % replies.length;
  S.successReplyIndex = (S.successReplyIndex + 1) % replies.length;

  const root = S.rootProblem || S.issue || S.currentSymptom || null;
  S.lastSolvedIssue = root;

  // Mark only after a genuinely positive user message.
  S.issue = root;
  S.step = "solved";
  S.supportFailures = 0;
  S.lastQuestion = null;
  S.lastInstruction = null;

  const base = replies[i];

  const follow = {
    en: "If the same problem returns later, tell me what changed and we can continue from there.",
    ru: "Если эта же проблема позже вернётся, напиши, что изменилось, и мы продолжим диагностику оттуда.",
    fi: "Jos sama ongelma palaa myöhemmin, kerro mikä muuttui, niin voimme jatkaa siitä."
  }[l];

  const msg = base + "\n\n" + follow;
  S.lastAnswer = msg;
  return {type:"answer",text:msg};
}

V.handle = function(text,l){
  // Success detection has high priority, but only after there is/was
  // an active troubleshooting context. A random "good" in a new chat
  // must not be treated as "problem solved".
  const hasContext =
    !!(S.rootProblem || S.issue || S.currentSymptom ||
       S.lastInstruction || S.lastQuestion ||
       (S.facts && Object.keys(S.facts).length));

  if(hasContext && isSuccessOutcome(text)){
    return successReply(text);
  }

  return old(text,l);
};

window.ANITA_V12_8 = {
  version:"12.8",
  isSuccessOutcome,
  isNegativeOutcome
};

console.log("[ANITA v12.8] Success Feedback Engine loaded");
})();

/* ================= ANITA v12.9 END CHAT + RATING + VISITOR MEMORY =================
   Adds:
   - end-of-chat flow after a successful support session
   - "Can I help with anything else?"
   - clickable 1–5 star rating INSIDE the chat
   - anonymous persistent visitor ID in localStorage
   - session count / message count / rating history in localStorage
   - optional analytics POST hook for a future Alex Node backend

   IMPORTANT:
   LocalStorage lets ANITA remember the same browser/device.
   Alex Node cannot see those records remotely until ANITA_ANALYTICS_ENDPOINT
   is connected to a backend/database.
   ================================================================================ */
(function(){
"use strict";

if(!window.ANITA_V12 || typeof window.ANITA_V12.handle!=="function") return;

const V = window.ANITA_V12;
const old = V.handle.bind(V);
const S = V.state;

S.awaitingAnythingElse = S.awaitingAnythingElse || false;
S.ratingOffered = S.ratingOffered || false;
S.ratingSubmitted = S.ratingSubmitted || false;

const clean = s => (s||"")
  .toLowerCase()
  .replace(/[’`]/g,"'")
  .replace(/[?!.,:;()[\]{}"“”]/g," ")
  .replace(/\s+/g," ")
  .trim();

function langOf(text){
  if(/[а-яё]/i.test(text)) return "ru";
  if(/[äöå]/i.test(text) || /\b(kiitos|toimii|kaikki hyvin|ei muuta|siinä kaikki)\b/i.test(text)) return "fi";
  return S.language || "en";
}
function R(l,en,ru,fi){ return l==="ru"?ru:l==="fi"?fi:en; }

function uid(){
  try{
    let id=localStorage.getItem("anita_user_id");
    if(!id){
      id="ANITA-"+Date.now().toString(36)+"-"+Math.random().toString(36).slice(2,10);
      localStorage.setItem("anita_user_id",id);
    }
    return id;
  }catch(e){
    return "ANITA-session-"+Math.random().toString(36).slice(2,10);
  }
}

function readStats(){
  try{
    return JSON.parse(localStorage.getItem("anita_usage_stats")||"{}");
  }catch(e){ return {}; }
}
function writeStats(st){
  try{ localStorage.setItem("anita_usage_stats",JSON.stringify(st)); }catch(e){}
}

const visitorId=uid();
(function initUsage(){
  const st=readStats();
  st.visitorId=visitorId;
  st.firstSeen=st.firstSeen||new Date().toISOString();
  st.lastSeen=new Date().toISOString();
  st.sessions=(st.sessions||0)+1;
  st.messages=st.messages||0;
  st.ratings=Array.isArray(st.ratings)?st.ratings:[];
  writeStats(st);
})();

function logEvent(type,data){
  const st=readStats();
  st.visitorId=visitorId;
  st.lastSeen=new Date().toISOString();
  if(type==="user_message") st.messages=(st.messages||0)+1;
  if(type==="rating"){
    st.ratings=Array.isArray(st.ratings)?st.ratings:[];
    st.ratings.push({
      value:data && data.value,
      at:new Date().toISOString()
    });
    if(st.ratings.length>50) st.ratings=st.ratings.slice(-50);
    st.lastRating=data && data.value;
  }
  writeStats(st);

  // Optional future remote analytics endpoint.
  // Example:
  // window.ANITA_ANALYTICS_ENDPOINT = "https://your-backend.example/anita-event";
  const endpoint=window.ANITA_ANALYTICS_ENDPOINT;
  if(endpoint){
    try{
      fetch(endpoint,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          visitorId,
          type,
          data:data||{},
          page:location.href,
          at:new Date().toISOString()
        }),
        keepalive:true
      }).catch(()=>{});
    }catch(e){}
  }
}

function hasSolvedContext(){
  return S.step==="solved" || !!S.lastSolvedIssue;
}

function isThanksResolved(text){
  const t=clean(text);

  const thanks =
    /\b(thanks|thank you|thx|ty|cheers)\b/i.test(t) ||
    /\b(спасибо|благодарю|спс)\b/i.test(t) ||
    /\b(kiitos|kiitti)\b/i.test(t);

  const solved =
    /\b(it worked|it works|everything is fine|everything works|all good|problem solved|fixed|fine now|working now|that helped|helped)\b/i.test(t) ||
    /\b(заработало|работает|всё хорошо|все хорошо|всё работает|все работает|проблема решена|помогло|теперь нормально)\b/i.test(t) ||
    /\b(toimii|kaikki hyvin|kaikki toimii|ongelma ratkesi|auttoi|nyt kunnossa)\b/i.test(t);

  return thanks && (solved || hasSolvedContext());
}

function isThanksOnlyAfterSolved(text){
  if(!hasSolvedContext()) return false;
  const t=clean(text);
  return [
    "thanks","thank you","thx","ty","thanks anita","thank you anita",
    "спасибо","спс","благодарю","спасибо анита",
    "kiitos","kiitti","kiitos anita"
  ].includes(t);
}

function isNoMore(text){
  const t=clean(text);
  const exact=[
    "no","no thanks","no thank you","nothing else","nothing","that's all","thats all",
    "all good","i'm good","im good","nope","not now","that's it","thats it",
    "нет","нет спасибо","ничего","больше ничего","это всё","это все","всё","все","не надо",
    "ei","ei kiitos","ei muuta","siinä kaikki","ei nyt","kaikki hyvin"
  ];
  return exact.includes(t);
}

function isYesMore(text){
  const t=clean(text);
  return [
    "yes","yeah","yep","yes please","actually yes","i have another problem",
    "да","да есть","да пожалуйста","есть ещё проблема","есть еще проблема",
    "kyllä","joo","on toinen ongelma","kyllä kiitos"
  ].includes(t);
}

function askAnythingElse(l){
  S.awaitingAnythingElse=true;
  S.ratingOffered=false;

  const msg=R(l,
    "You're very welcome 😊 I'm glad that helped. Can I help you with anything else?",
    "Пожалуйста 😊 Рад, что это помогло. Могу я помочь ещё с чем-нибудь?",
    "Ole hyvä 😊 Mukava kuulla, että siitä oli apua. Voinko auttaa vielä jossain muussa?"
  );
  S.lastAnswer=msg;
  return {type:"answer",text:msg};
}

function addBotText(text){
  try{
    if(typeof addMessage==="function"){
      addMessage(text,"bot");
      return;
    }
    const c=document.querySelector("#chat");
    if(!c) return;
    const d=document.createElement("div");
    d.className="msg bot";
    d.textContent=text;
    c.appendChild(d);
    c.scrollTop=c.scrollHeight;
  }catch(e){}
}

function showRatingWidget(l){
  S.awaitingAnythingElse=false;
  S.ratingOffered=true;

  const c=document.querySelector("#chat");
  if(!c) return;

  if(document.getElementById("anitaRatingCard")) return;

  const card=document.createElement("div");
  card.id="anitaRatingCard";
  card.className="contactCard";
  card.style.maxWidth="94%";

  const title=document.createElement("div");
  title.style.fontWeight="800";
  title.style.fontSize="15px";
  title.style.marginBottom="6px";
  title.textContent=R(l,
    "How was ANITA's support?",
    "Как тебе помощь ANITA?",
    "Millaista ANITAn tuki oli?"
  );

  const sub=document.createElement("div");
  sub.style.fontSize="12px";
  sub.style.color="#666";
  sub.style.marginBottom="10px";
  sub.textContent=R(l,
    "Choose from 1 to 5 stars.",
    "Выбери оценку от 1 до 5 звёзд.",
    "Valitse 1–5 tähteä."
  );

  const stars=document.createElement("div");
  stars.setAttribute("role","radiogroup");
  stars.setAttribute("aria-label","ANITA support rating");
  stars.style.display="flex";
  stars.style.gap="7px";
  stars.style.alignItems="center";

  const buttons=[];

  function paint(value){
    buttons.forEach((b,i)=>{
      b.textContent=i<value ? "★" : "☆";
      b.style.transform=i<value ? "scale(1.08)" : "scale(1)";
    });
  }

  for(let i=1;i<=5;i++){
    const b=document.createElement("button");
    b.type="button";
    b.setAttribute("aria-label",i+" stars");
    b.setAttribute("role","radio");
    b.setAttribute("aria-checked","false");
    b.textContent="☆";
    b.style.border="0";
    b.style.background="transparent";
    b.style.padding="2px";
    b.style.fontSize="32px";
    b.style.lineHeight="1";
    b.style.cursor="pointer";
    b.style.color="#ff6a00";
    b.style.transition="transform .12s ease";
    b.addEventListener("mouseenter",()=>paint(i));
    b.addEventListener("mouseleave",()=>{
      const chosen=Number(card.dataset.rating||0);
      paint(chosen);
    });
    b.addEventListener("click",()=>{
      if(S.ratingSubmitted) return;
      card.dataset.rating=String(i);
      S.ratingSubmitted=true;
      buttons.forEach((x,j)=>{
        x.disabled=true;
        x.setAttribute("aria-checked",j===i?"true":"false");
      });
      paint(i);
      logEvent("rating",{value:i,issue:S.lastSolvedIssue||S.rootProblem||S.issue||null});

      const thanks=document.createElement("div");
      thanks.style.marginTop="10px";
      thanks.style.fontSize="13px";
      thanks.style.fontWeight="700";
      thanks.textContent=R(l,
        `Thanks for rating ANITA ${i}/5!`,
        `Спасибо за оценку ANITA: ${i}/5!`,
        `Kiitos ANITAn arviosta: ${i}/5!`
      );
      card.appendChild(thanks);

      setTimeout(()=>{
        addBotText(R(l,
          i>=4
            ? "Thank you 😊 Your feedback helps improve ANITA."
            : "Thank you for the feedback. It helps show where ANITA needs to improve.",
          i>=4
            ? "Спасибо 😊 Твоя оценка помогает улучшать ANITA."
            : "Спасибо за обратную связь. Она помогает понять, где ANITA нужно стать лучше.",
          i>=4
            ? "Kiitos 😊 Palautteesi auttaa parantamaan ANITAa."
            : "Kiitos palautteesta. Se auttaa näkemään, missä ANITAn pitää kehittyä."
        ));
      },150);
    });
    buttons.push(b);
    stars.appendChild(b);
  }

  card.appendChild(title);
  card.appendChild(sub);
  card.appendChild(stars);
  c.appendChild(card);
  c.scrollTop=c.scrollHeight;

  logEvent("rating_shown",{issue:S.lastSolvedIssue||S.rootProblem||S.issue||null});
}

function offerRating(l){
  const msg=R(l,
    "Okay 😊 Before you go, would you rate ANITA's support? Just click a star below.",
    "Хорошо 😊 Перед уходом оцени, пожалуйста, помощь ANITA — просто нажми на звезду ниже.",
    "Selvä 😊 Ennen kuin lähdet, arvioisitko ANITAn tuen? Napsauta vain tähteä alta."
  );

  // We return text normally; widget appears right after the bot message is rendered.
  setTimeout(()=>showRatingWidget(l),320);
  return {type:"answer",text:msg};
}

V.handle=function(text,l){
  const language=langOf(text);
  logEvent("user_message",{language});

  // A solved conversation + gratitude should move into the closing flow.
  if(isThanksResolved(text) || isThanksOnlyAfterSolved(text)){
    return askAnythingElse(language);
  }

  // ANITA already asked if anything else is needed.
  if(S.awaitingAnythingElse){
    if(isNoMore(text)){
      S.awaitingAnythingElse=false;
      return offerRating(language);
    }

    if(isYesMore(text)){
      S.awaitingAnythingElse=false;
      S.ratingOffered=false;
      S.ratingSubmitted=false;
      const msg=R(language,
        "Of course. Tell me the next problem in your own words.",
        "Конечно. Опиши следующую проблему своими словами.",
        "Totta kai. Kuvaile seuraava ongelma omin sanoin."
      );
      S.lastAnswer=msg;
      return {type:"answer",text:msg};
    }

    // If they simply describe another real problem instead of answering yes,
    // let ANITA process it as a new request rather than forcing the rating.
    S.awaitingAnythingElse=false;
  }

  return old(text,l);
};

// Public helpers for future Alex Node analytics/dashboard integration.
window.ANITA_VISITOR = {
  id: visitorId,
  getStats: readStats,
  clearLocalStats: function(){
    try{ localStorage.removeItem("anita_usage_stats"); }catch(e){}
  },
  showRating: function(l){ showRatingWidget(l||S.language||"en"); }
};

window.ANITA_V12_9 = {version:"12.9"};

console.log("[ANITA v12.9] End Chat + Rating + Visitor Memory loaded", visitorId);
})();

/* ================= ANITA v13 GUIDED PROCEDURE MEMORY =================
   Fixes a core support-flow problem:
   - ANITA gives ONE actionable step at a time.
   - "done / сделал / valmis" means the user completed ANITA's current step.
   - "didn't help / не помогло / ei auttanut" means the current step failed,
     so ANITA advances to the next useful diagnostic step.
   - short replies stay attached to the active troubleshooting procedure.
   - typo-tolerant slow-PC detection (e.g. "медленео").
   - EN / RU / FI share the same state machine.

   This layer runs BEFORE older generic knowledge/fallback handlers.
   ===================================================================== */
(function(){
"use strict";

if(!window.ANITA_V12 || typeof window.ANITA_V12.handle!=="function") return;

const V = window.ANITA_V12;
const old = V.handle.bind(V);
const S = V.state;

S.procedure = S.procedure || null;
S.procedureStep = S.procedureStep || null;
S.awaitingResult = S.awaitingResult || false;
S.lastProcedureAction = S.lastProcedureAction || null;

const clean = s => (s||"")
  .toLowerCase()
  .replace(/[’`]/g,"'")
  .replace(/[?!.,:;()[\]{}"“”]/g," ")
  .replace(/\s+/g," ")
  .trim();

function langOf(text){
  if(/[а-яё]/i.test(text)) return "ru";
  if(/[äöå]/i.test(text) || /\b(tietokone|hidas|valmis|ei auttanut|muisti|levy)\b/i.test(text)) return "fi";
  return S.language || "en";
}
function R(l,en,ru,fi){ return l==="ru"?ru:l==="fi"?fi:en; }

function levenshtein(a,b){
  if(a===b) return 0;
  if(!a.length) return b.length;
  if(!b.length) return a.length;
  const v0=Array(b.length+1).fill(0).map((_,i)=>i);
  const v1=Array(b.length+1).fill(0);
  for(let i=0;i<a.length;i++){
    v1[0]=i+1;
    for(let j=0;j<b.length;j++){
      const cost=a[i]===b[j]?0:1;
      v1[j+1]=Math.min(v1[j]+1, v0[j+1]+1, v0[j]+cost);
    }
    for(let j=0;j<v0.length;j++) v0[j]=v1[j];
  }
  return v0[b.length];
}

function nearWord(word, target, maxDist){
  word=String(word||"").toLowerCase();
  target=String(target||"").toLowerCase();
  if(Math.abs(word.length-target.length)>maxDist) return false;
  return levenshtein(word,target)<=maxDist;
}

function slowIntent(text){
  const t=clean(text);
  const ws=t.split(/\s+/);

  const hasDevice = /\b(pc|computer|laptop|machine|windows|компьютер|комп|пк|ноут|ноутбук|tietokone|kone|läppäri)\b/i.test(t);
  if(!hasDevice) return false;

  if(/\b(slow|slowly|sluggish|laggy|lagging)\b/i.test(t)) return true;
  if(/\b(медленно|тормозит|тормозить|лагает|тупит)\b/i.test(t)) return true;
  if(/\b(hidas|hitaasti|lagaa|hidastelee)\b/i.test(t)) return true;

  // typo tolerance around common "slow" words
  for(const w of ws){
    if(w.length>=6 && (
      nearWord(w,"медленно",2) ||
      nearWord(w,"медленный",2) ||
      nearWord(w,"hitaasti",2) ||
      nearWord(w,"sluggish",2)
    )) return true;
  }
  return false;
}

function isDone(text){
  const t=clean(text);
  return [
    "done","did it","i did it","finished","ready","completed","ok done","okay done",
    "сделал","сделала","сделано","готово","выполнил","выполнила","готов",
    "valmis","tein sen","tehty","onnistui"
  ].includes(t);
}

function isFailed(text){
  const t=clean(text);
  return [
    "didn't help","didnt help","did not help","no change","nothing changed",
    "still slow","still the same","same","same problem","not better","still not working",
    "не помогло","не помог","ничего не изменилось","так же","всё так же","все так же",
    "всё ещё медленно","все еще медленно","по прежнему медленно","по-прежнему медленно",
    "ei auttanut","ei muuttunut","sama","edelleen hidas","vielä hidas"
  ].includes(t);
}

function isSuccess(text){
  const t=clean(text);
  if(isFailed(text)) return false;
  return [
    "worked","it worked","it works","better","much better","faster","fixed","yes it helped",
    "заработало","помогло","стало лучше","стало быстрее","теперь нормально","исправилось",
    "toimii","auttoi","parempi","nopeampi","korjaantui"
  ].includes(t);
}

function setSlowProcedure(l){
  S.rootProblem="slow_pc";
  S.issue="slow_pc";
  S.currentSymptom="slow_pc";
  S.procedure="slow_pc";
  S.procedureStep="restart";
  S.awaitingResult=false;
  S.language=l;
  return stepRestart(l);
}

function stepRestart(l){
  S.procedureStep="restart";
  S.lastProcedureAction="restart_pc";
  S.awaitingResult=false;
  S.lastInstruction="restart_pc";
  const msg=R(l,
`Let's troubleshoot the slow PC one step at a time.

Step 1 — restart the computer:
1. Save your open work.
2. Click Start → Power → Restart.
3. Wait until Windows fully starts again.

When you are back, write “done”. I will give you the next check.`,
`Давай разберём медленную работу ПК по одному шагу за раз.

Шаг 1 — перезагрузи компьютер:
1. Сохрани открытую работу.
2. Пуск → Питание → Перезагрузка.
3. Дождись полной загрузки Windows.

Когда компьютер загрузится, напиши «сделал» или «готово». Я дам следующий шаг.`,
`Tutkitaan hidasta tietokonetta yksi vaihe kerrallaan.

Vaihe 1 — käynnistä tietokone uudelleen:
1. Tallenna avoimet työt.
2. Käynnistä → Virta → Käynnistä uudelleen.
3. Odota, että Windows käynnistyy kokonaan.

Kun olet takaisin, kirjoita “valmis”. Annan seuraavan tarkistuksen.`);
  S.lastAnswer=msg;
  return {type:"answer",text:msg};
}

function askRestartResult(l){
  S.awaitingResult=true;
  S.lastQuestion="restart_result";
  const msg=R(l,
    "Good. Is the computer noticeably faster now, or is it still slow?",
    "Хорошо. Компьютер теперь заметно быстрее или всё ещё работает медленно?",
    "Hyvä. Onko tietokone nyt selvästi nopeampi vai onko se edelleen hidas?");
  S.lastAnswer=msg;
  return {type:"answer",text:msg};
}

function stepTaskManager(l){
  S.procedureStep="task_manager";
  S.awaitingResult=false;
  S.lastProcedureAction="check_task_manager";
  S.lastInstruction="slow_task_manager";
  const msg=R(l,
`Restart did not solve it, so let's check what resource is under pressure.

Step 2:
1. Press Ctrl + Shift + Esc.
2. In Task Manager look at CPU, Memory and Disk.
3. Tell me which one is highest AND its percentage.

Examples:
“CPU 95%”
“Memory 85%”
“Disk 100%”`,
`Перезагрузка не решила проблему, поэтому посмотрим, какой ресурс перегружен.

Шаг 2:
1. Нажми Ctrl + Shift + Esc.
2. В Диспетчере задач посмотри CPU/ЦП, Память и Диск.
3. Напиши, что загружено сильнее всего И какой процент.

Например:
«CPU 95%»
«Память 85%»
«Диск 100%»`,
`Uudelleenkäynnistys ei ratkaissut ongelmaa, joten tarkistetaan mikä resurssi on kuormittunut.

Vaihe 2:
1. Paina Ctrl + Shift + Esc.
2. Katso Tehtävienhallinnasta CPU, Memory ja Disk.
3. Kerro mikä on korkein JA prosentti.

Esimerkiksi:
“CPU 95 %”
“Memory 85 %”
“Disk 100 %”`);
  S.lastAnswer=msg;
  S.lastQuestion="slow_resource_report";
  return {type:"answer",text:msg};
}

function stepDiskFree(l){
  S.procedureStep="disk_space";
  S.awaitingResult=false;
  S.lastProcedureAction="check_disk_space";
  S.lastInstruction="check_disk_space";
  const msg=R(l,
`Let's check free space next.

Step 3:
1. Press Windows + E.
2. Open “This PC”.
3. Look at Local Disk (C:).
4. Tell me how much free space is left.

Example: “18 GB free of 237 GB”.`,
`Теперь проверим свободное место.

Шаг 3:
1. Нажми Windows + E.
2. Открой «Этот компьютер».
3. Посмотри «Локальный диск (C:)».
4. Напиши, сколько свободного места осталось.

Например: «18 ГБ свободно из 237 ГБ».`,
`Tarkistetaan seuraavaksi vapaa levytila.

Vaihe 3:
1. Paina Windows + E.
2. Avaa “This PC”.
3. Katso Local Disk (C:).
4. Kerro paljonko vapaata tilaa on jäljellä.

Esimerkiksi: “18 Gt vapaana 237 Gt:sta”.`);
  S.lastAnswer=msg;
  S.lastQuestion="disk_free_report";
  return {type:"answer",text:msg};
}

function stepStartup(l){
  S.procedureStep="startup";
  S.awaitingResult=false;
  S.lastProcedureAction="disable_startup";
  S.lastInstruction="disable_startup";
  const msg=R(l,
`Let's reduce unnecessary startup load.

Step 4:
1. Press Ctrl + Shift + Esc.
2. Open “Startup apps”.
3. Look for apps you recognize and do not need immediately after Windows starts.
4. Disable only those unnecessary apps — do not disable security software or drivers.
5. Restart the PC.

Then write “done”.`,
`Уменьшим лишнюю нагрузку автозагрузки.

Шаг 4:
1. Нажми Ctrl + Shift + Esc.
2. Открой «Автозагрузка приложений».
3. Найди знакомые программы, которые не нужны сразу после запуска Windows.
4. Отключи только ненужные программы — не отключай защитное ПО и драйверы.
5. Перезагрузи ПК.

После этого напиши «сделал» или «готово».`,
`Vähennetään turhaa käynnistyskuormaa.

Vaihe 4:
1. Paina Ctrl + Shift + Esc.
2. Avaa “Startup apps”.
3. Etsi tunnistamiasi ohjelmia, joita et tarvitse heti Windowsin käynnistyessä.
4. Poista käytöstä vain tarpeettomat ohjelmat — älä poista tietoturvaohjelmia tai ajureita.
5. Käynnistä tietokone uudelleen.

Kirjoita sitten “valmis”.`);
  S.lastAnswer=msg;
  return {type:"answer",text:msg};
}

function stepDefender(l){
  S.procedureStep="defender";
  S.awaitingResult=false;
  S.lastProcedureAction="defender_scan";
  S.lastInstruction="defender_scan";
  const msg=R(l,
`One more safe check:

Step 5:
1. Open Windows Security.
2. Open Virus & threat protection.
3. Run Quick scan.
4. Let it finish.

Then tell me whether Defender found anything.`,
`Ещё одна безопасная проверка:

Шаг 5:
1. Открой «Безопасность Windows».
2. «Защита от вирусов и угроз».
3. Запусти «Быструю проверку».
4. Дождись завершения.

После этого напиши, нашёл ли Defender что-нибудь.`,
`Vielä yksi turvallinen tarkistus:

Vaihe 5:
1. Avaa Windows Security.
2. Avaa Virus & threat protection.
3. Suorita Quick scan.
4. Odota tarkistuksen valmistumista.

Kerro sitten löytyikö Defenderissä mitään.`);
  S.lastAnswer=msg;
  S.lastQuestion="defender_result";
  return {type:"answer",text:msg};
}

function escalate(l){
  S.procedureStep="escalate";
  S.awaitingResult=false;
  const msg=R(l,
`We've gone through the basic safe checks and the PC is still slow.

At this point I can keep diagnosing with you, but a real IT specialist may be faster — especially if the problem is caused by hardware, storage health, overheating, or something that needs hands-on testing.

You can press “Contact a specialist” below to see the available IT-support contacts.`,
`Мы прошли базовые безопасные проверки, а компьютер всё ещё работает медленно.

Я могу продолжить диагностику, но на этом этапе реальный IT‑специалист может решить проблему быстрее — особенно если причина в железе, состоянии накопителя, перегреве или требуется физическая проверка.

Нажми «Contact a specialist» ниже, чтобы открыть контакты IT‑поддержки.`,
`Olemme käyneet läpi turvalliset perustarkistukset ja tietokone on edelleen hidas.

Voin jatkaa vianmääritystä, mutta tässä vaiheessa oikea IT-asiantuntija voi olla nopeampi ratkaisu — varsinkin jos syy liittyy laitteistoon, levyn kuntoon, ylikuumenemiseen tai vaatii fyysistä tarkistusta.

Paina alla “Contact a specialist” nähdäksesi IT-tukikontaktit.`);
  S.lastAnswer=msg;
  try{
    if(typeof showHuman==="function") setTimeout(()=>showHuman(l),100);
  }catch(e){}
  return {type:"answer",text:msg};
}

function handleProcedure(text,l){
  if(S.procedure!=="slow_pc") return null;

  // Current instruction completed.
  if(isDone(text)){
    if(S.procedureStep==="restart") return askRestartResult(l);

    if(S.procedureStep==="startup"){
      S.awaitingResult=true;
      S.lastQuestion="startup_result";
      return {type:"answer",text:R(l,
        "Good. After the restart, is the PC noticeably faster?",
        "Хорошо. После перезагрузки компьютер стал заметно быстрее?",
        "Hyvä. Onko tietokone uudelleenkäynnistyksen jälkeen selvästi nopeampi?")};
    }

    // For observational steps, "done" alone is not enough; ask for the result.
    if(S.procedureStep==="task_manager"){
      return {type:"answer",text:R(l,
        "Good. What did Task Manager show as the highest: CPU, Memory, or Disk? Please include the percentage.",
        "Хорошо. Что в Диспетчере задач загружено сильнее всего: CPU, Память или Диск? Напиши также процент.",
        "Hyvä. Mikä oli Tehtävienhallinnassa korkein: CPU, Memory vai Disk? Kerro myös prosentti.")};
    }

    if(S.procedureStep==="disk_space"){
      return {type:"answer",text:R(l,
        "Good. How much free space does drive C: show?",
        "Хорошо. Сколько свободного места показывает диск C:?",
        "Hyvä. Paljonko C:-asemalla näkyy vapaata tilaa?")};
    }

    if(S.procedureStep==="defender"){
      return {type:"answer",text:R(l,
        "Good. Did Windows Security find any threats?",
        "Хорошо. Windows Security нашёл какие-нибудь угрозы?",
        "Hyvä. Löysikö Windows Security uhkia?")};
    }
  }

  // Explicit failure advances the procedure instead of losing context.
  if(isFailed(text)){
    if(S.procedureStep==="restart" || S.lastQuestion==="restart_result")
      return stepTaskManager(l);

    if(S.procedureStep==="startup" || S.lastQuestion==="startup_result")
      return stepDefender(l);

    if(S.procedureStep==="defender")
      return escalate(l);

    // If user says "didn't help" after a measurement, do not repeat it.
    if(S.procedureStep==="task_manager")
      return stepDiskFree(l);

    if(S.procedureStep==="disk_space")
      return stepStartup(l);
  }

  // Genuine success ends the procedure.
  if(isSuccess(text)){
    S.step="solved";
    S.lastSolvedIssue="slow_pc";
    S.procedure=null;
    S.procedureStep=null;
    const msg=R(l,
      "Great! That means this step helped and the PC is behaving better 😊",
      "Отлично! Значит этот шаг помог и компьютер теперь работает лучше 😊",
      "Hienoa! Tämä vaihe auttoi ja tietokone toimii nyt paremmin 😊");
    S.lastAnswer=msg;
    return {type:"answer",text:msg};
  }

  return null;
}

V.handle=function(text,l){
  const language=langOf(text);

  // Strong typo-tolerant slow-PC entry point.
  if(slowIntent(text) && S.procedure!=="slow_pc"){
    return setSlowProcedure(language);
  }

  // Active procedure ALWAYS gets first chance at short result words.
  const guided=handleProcedure(text,language);
  if(guided) return guided;

  return old(text,l);
};

window.ANITA_V13={
  version:"13.0",
  slowIntent,
  isDone,
  isFailed,
  isSuccess
};

console.log("[ANITA v13] Guided Procedure Memory loaded");
})();

/* ================= ANITA v14 LEARNING + CASE MEMORY ENGINE =================
   Controlled self-learning foundation for ANITA.

   What it does:
   - remembers successful troubleshooting cases in localStorage
   - groups repeated successful solutions by issue + action
   - tracks success/failure counts and confidence
   - NEVER rewrites ANITA's source code by itself
   - learned solutions stay "pending" until approved
   - approved solutions may be shown as an extra hint in similar future cases
   - supports anonymous visitor memory
   - can export learning data as JSON
   - can optionally send learning events to a future Alex Node backend

   This is intentionally moderated learning, not unsafe automatic code mutation.
   =========================================================================== */
(function(){
"use strict";

if(!window.ANITA_V12 || typeof window.ANITA_V12.handle!=="function") return;

const V = window.ANITA_V12;
const old = V.handle.bind(V);
const S = V.state;

const STORE_KEY = "anita_learning_cases_v14";
const META_KEY  = "anita_learning_meta_v14";

function clean(s){
  return (s||"")
    .toLowerCase()
    .replace(/[’`]/g,"'")
    .replace(/[?!.,:;()[\]{}"“”]/g," ")
    .replace(/\s+/g," ")
    .trim();
}

function languageOf(text){
  if(/[а-яё]/i.test(text)) return "ru";
  if(/[äöå]/i.test(text) || /\b(tietokone|toimii|kiitos|hidas|muisti|selain)\b/i.test(text)) return "fi";
  return S.language || "en";
}

function R(l,en,ru,fi){
  return l==="ru" ? ru : l==="fi" ? fi : en;
}

function getVisitorId(){
  try{
    return localStorage.getItem("anita_user_id") ||
           (window.ANITA_VISITOR && window.ANITA_VISITOR.id) ||
           "anonymous";
  }catch(e){
    return "anonymous";
  }
}

function readCases(){
  try{
    const v = JSON.parse(localStorage.getItem(STORE_KEY) || "[]");
    return Array.isArray(v) ? v : [];
  }catch(e){
    return [];
  }
}

function writeCases(cases){
  try{
    localStorage.setItem(STORE_KEY, JSON.stringify(cases.slice(-500)));
  }catch(e){}
}

function readMeta(){
  try{
    return JSON.parse(localStorage.getItem(META_KEY) || "{}");
  }catch(e){
    return {};
  }
}

function writeMeta(meta){
  try{
    localStorage.setItem(META_KEY, JSON.stringify(meta));
  }catch(e){}
}

function now(){ return new Date().toISOString(); }

function slug(s){
  return clean(s).replace(/[^a-zа-яёäöå0-9]+/gi,"_").replace(/^_+|_+$/g,"").slice(0,80);
}

function normalizeIssue(issue){
  const x = clean(issue || "");
  if(!x) return "unknown";
  if(x.includes("slow")) return "slow_pc";
  if(x.includes("browser_memory")) return "browser_memory";
  if(x.includes("browser")) return "browser";
  if(x.includes("internet")) return "internet";
  if(x.includes("wifi")) return "wifi";
  if(x.includes("dns")) return "dns";
  if(x.includes("printer")) return "printer";
  if(x.includes("sound")) return "sound";
  if(x.includes("display") || x.includes("monitor")) return "display";
  if(x.includes("bluetooth")) return "bluetooth";
  if(x.includes("malware") || x.includes("virus")) return "malware";
  if(x.includes("update")) return "windows_update";
  return slug(x) || "unknown";
}

function normalizeAction(action){
  return slug(action || "unknown_action") || "unknown_action";
}

function currentContextSnapshot(){
  return {
    issue: normalizeIssue(S.lastSolvedIssue || S.rootProblem || S.issue || S.currentSymptom),
    action: normalizeAction(S.lastProcedureAction || S.lastInstruction || S.step),
    symptom: clean(S.currentSymptom || ""),
    finding: S.currentFinding || null,
    facts: S.facts ? JSON.parse(JSON.stringify(S.facts)) : {},
    language: S.language || "en"
  };
}

function isNegative(text){
  const t=clean(text);
  const list=[
    "didn't work","didnt work","doesn't work","doesnt work","still not working",
    "didn't help","didnt help","not fixed","same problem","nothing changed",
    "не помогло","не работает","всё ещё не работает","все еще не работает",
    "ничего не изменилось","та же проблема","снова не работает",
    "ei auttanut","ei toimi","ei vieläkään toimi","sama ongelma","mikään ei muuttunut"
  ];
  return list.some(x=>t.includes(clean(x)));
}

function isPositive(text){
  if(isNegative(text)) return false;
  const t=clean(text);
  const list=[
    "it worked","it works","works now","working now","that worked","fixed",
    "fixed it","problem solved","all good","everything works","better now",
    "much better","faster now","that helped","thanks that helped",
    "заработало","работает","теперь работает","помогло","стало лучше",
    "стало быстрее","проблема решена","всё хорошо","все хорошо",
    "toimii","nyt toimii","auttoi","parempi","nopeampi","ongelma ratkesi","kaikki toimii"
  ];
  if(list.some(x=>t.includes(clean(x)))) return true;

  return /\b(worked|works|fixed|solved|helped)\b/i.test(t) ||
         /\b(заработал\w*|помогл\w*|решен\w*|исправил\w*)\b/i.test(t) ||
         /\b(toimii|onnistui|auttoi|ratkesi|korjaantui)\b/i.test(t);
}

function fingerprint(ctx){
  return [ctx.issue, ctx.action].join("|");
}

function confidenceOf(c){
  const s = Number(c.successes||0);
  const f = Number(c.failures||0);
  if(s+f===0) return 0;
  return s/(s+f);
}

function upsertCase(ctx, success){
  if(!ctx || !ctx.issue || ctx.issue==="unknown") return null;
  if(!ctx.action || ctx.action==="unknown_action" || ctx.action==="solved") return null;

  const cases=readCases();
  const key=fingerprint(ctx);
  let c=cases.find(x=>x.key===key);

  if(!c){
    c={
      id:"case_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,8),
      key,
      issue:ctx.issue,
      action:ctx.action,
      symptom:ctx.symptom||"",
      successes:0,
      failures:0,
      confidence:0,
      status:"pending",
      recommendedForApproval:false,
      firstSeen:now(),
      lastSeen:now(),
      sampleFacts:ctx.facts||{},
      visitorIds:[]
    };
    cases.push(c);
  }

  if(success) c.successes=(c.successes||0)+1;
  else c.failures=(c.failures||0)+1;

  c.lastSeen=now();
  c.confidence=Number(confidenceOf(c).toFixed(3));
  c.sampleFacts=ctx.facts||c.sampleFacts||{};

  const vid=getVisitorId();
  c.visitorIds=Array.isArray(c.visitorIds)?c.visitorIds:[];
  if(vid && !c.visitorIds.includes(vid)){
    c.visitorIds.push(vid);
    if(c.visitorIds.length>50) c.visitorIds=c.visitorIds.slice(-50);
  }

  // A case becomes a strong moderation candidate after repeated success.
  c.recommendedForApproval =
    c.status==="pending" &&
    c.successes>=3 &&
    c.confidence>=0.75;

  writeCases(cases);
  sendLearningEvent(success ? "learning_success" : "learning_failure", c);

  return c;
}

function sendLearningEvent(type,caseData){
  const endpoint =
    window.ANITA_LEARNING_ENDPOINT ||
    window.ANITA_ANALYTICS_ENDPOINT ||
    null;

  if(!endpoint) return;

  try{
    fetch(endpoint,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        type,
        visitorId:getVisitorId(),
        case:{
          id:caseData.id,
          key:caseData.key,
          issue:caseData.issue,
          action:caseData.action,
          successes:caseData.successes,
          failures:caseData.failures,
          confidence:caseData.confidence,
          status:caseData.status
        },
        at:now(),
        page:location.href
      }),
      keepalive:true
    }).catch(()=>{});
  }catch(e){}
}

function bestApprovedCase(issue){
  const cases=readCases()
    .filter(c=>c.status==="approved" && c.issue===normalizeIssue(issue))
    .filter(c=>(c.successes||0)>=2 && (c.confidence||0)>=0.70)
    .sort((a,b)=>{
      if((b.confidence||0)!==(a.confidence||0)) return (b.confidence||0)-(a.confidence||0);
      return (b.successes||0)-(a.successes||0);
    });
  return cases[0]||null;
}

const ACTION_LABELS={
  restart_pc:{
    en:"restart the computer",
    ru:"перезагрузить компьютер",
    fi:"käynnistää tietokone uudelleen"
  },
  slow_task_manager:{
    en:"check Task Manager for the highest CPU / Memory / Disk usage",
    ru:"проверить в Диспетчере задач CPU / Память / Диск",
    fi:"tarkistaa Tehtävienhallinnasta CPU / Memory / Disk"
  },
  check_task_manager:{
    en:"check Task Manager",
    ru:"проверить Диспетчер задач",
    fi:"tarkistaa Tehtävienhallinta"
  },
  check_disk_space:{
    en:"check free space on drive C:",
    ru:"проверить свободное место на диске C:",
    fi:"tarkistaa C:-aseman vapaa tila"
  },
  disable_startup:{
    en:"reduce unnecessary startup apps",
    ru:"отключить ненужные программы из автозагрузки",
    fi:"vähentää tarpeettomia käynnistysohjelmia"
  },
  defender_scan:{
    en:"run a Windows Security scan",
    ru:"выполнить проверку Windows Security",
    fi:"suorittaa Windows Security -tarkistus"
  },
  dns_flush:{
    en:"flush the DNS cache",
    ru:"очистить DNS-кэш",
    fi:"tyhjentää DNS-välimuisti"
  },
  browser_cache:{
    en:"clear browser cache",
    ru:"очистить кэш браузера",
    fi:"tyhjentää selaimen välimuisti"
  },
  chrome_task_manager:{
    en:"inspect Chrome Task Manager",
    ru:"проверить Диспетчер задач Chrome",
    fi:"tarkistaa Chromen Tehtävienhallinta"
  }
};

function actionLabel(action,l){
  const x=ACTION_LABELS[action];
  if(!x) return action.replace(/_/g," ");
  return x[l]||x.en;
}

function maybeAppendLearnedHint(result,text){
  if(!result || !result.text || typeof result.text!=="string") return result;

  const issue=normalizeIssue(S.rootProblem || S.issue || S.currentSymptom);
  if(!issue || issue==="unknown") return result;

  const learned=bestApprovedCase(issue);
  if(!learned) return result;

  // Do not append repeatedly during the same issue.
  if(S.learnedHintShownFor===learned.id) return result;
  S.learnedHintShownFor=learned.id;

  const l=languageOf(text);
  const hint=R(l,
    `\n\nANITA learned note: in previously approved successful cases with a similar issue, “${actionLabel(learned.action,l)}” helped. This is a useful clue, not a guaranteed diagnosis.`,
    `\n\nЗаметка из опыта ANITA: в ранее подтверждённых успешных случаях с похожей проблемой помогало действие «${actionLabel(learned.action,l)}». Это полезная подсказка, но не гарантированный диагноз.`,
    `\n\nANITAn oppima huomio: aiemmin hyväksytyissä onnistuneissa samankaltaisissa tapauksissa “${actionLabel(learned.action,l)}” auttoi. Tämä on hyödyllinen vihje, ei varma diagnoosi.`
  );

  return Object.assign({},result,{text:result.text+hint});
}

function approveCase(id){
  const cases=readCases();
  const c=cases.find(x=>x.id===id);
  if(!c) return false;
  c.status="approved";
  c.approvedAt=now();
  c.recommendedForApproval=false;
  writeCases(cases);
  sendLearningEvent("learning_approved",c);
  return true;
}

function rejectCase(id){
  const cases=readCases();
  const c=cases.find(x=>x.id===id);
  if(!c) return false;
  c.status="rejected";
  c.rejectedAt=now();
  c.recommendedForApproval=false;
  writeCases(cases);
  sendLearningEvent("learning_rejected",c);
  return true;
}

function pendingCases(){
  return readCases()
    .filter(c=>c.status==="pending")
    .sort((a,b)=>(b.successes||0)-(a.successes||0));
}

function exportData(){
  return {
    version:"14.0",
    exportedAt:now(),
    visitorId:getVisitorId(),
    cases:readCases(),
    meta:readMeta()
  };
}

function downloadExport(){
  try{
    const data=JSON.stringify(exportData(),null,2);
    const blob=new Blob([data],{type:"application/json"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;
    a.download="anita-learning-export-"+Date.now()+".json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),500);
    return true;
  }catch(e){
    return false;
  }
}

V.handle=function(text,l){
  const snapshot=currentContextSnapshot();
  const positive=isPositive(text);
  const negative=isNegative(text);

  const result=old(text,l);

  // Learn only from explicit user outcomes.
  if(positive){
    upsertCase(snapshot,true);
  } else if(negative){
    upsertCase(snapshot,false);
  }

  // Approved learned experience can supplement, but never replace,
  // the normal deterministic troubleshooting response.
  return maybeAppendLearnedHint(result,text);
};

window.ANITA_LEARNING={
  version:"14.0",
  getCases:readCases,
  getPending:pendingCases,
  getApproved:function(){return readCases().filter(c=>c.status==="approved");},
  approve:approveCase,
  reject:rejectCase,
  export:exportData,
  downloadExport,
  clear:function(){
    try{
      localStorage.removeItem(STORE_KEY);
      localStorage.removeItem(META_KEY);
      return true;
    }catch(e){ return false; }
  }
};

window.ANITA_V14={version:"14.0"};

console.log("[ANITA v14] Learning + Case Memory Engine loaded");
})();

/* ================= ANITA v14.1 ANSWER-TO-QUESTION CONTEXT ROUTER =================
   Fixes:
   - If ANITA asks CPU / Memory / Disk and user replies "Browser", "Chrome",
     "браузер", "хром", "selain", etc., treat it as an observation from
     Task Manager, NOT as a new browser topic and NOT as fallback.
   - Keeps the slow-PC root problem active.
   - Understands process/app names as answers to Task Manager questions.
   - Asks the missing measurement: CPU or Memory + value.
   - If user then gives "Memory 85%" / "RAM 85%" / "CPU 90%" / "1000 MB",
     continues diagnosis instead of glossary/fallback.
   - Generic short replies are interpreted against ANITA's last question first.
   ================================================================================ */
(function(){
"use strict";

if(!window.ANITA_V12 || typeof window.ANITA_V12.handle!=="function") return;

const V = window.ANITA_V12;
const old = V.handle.bind(V);
const S = V.state;

S.observationProcess = S.observationProcess || null;
S.observationMetric = S.observationMetric || null;
S.observationValue = S.observationValue || null;

function clean(s){
  return (s||"")
    .toLowerCase()
    .replace(/[’`]/g,"'")
    .replace(/[?!.,:;()[\]{}"“”]/g," ")
    .replace(/\s+/g," ")
    .trim();
}
function langOf(text){
  if(/[а-яё]/i.test(text)) return "ru";
  if(/[äöå]/i.test(text) || /\b(selain|muisti|levy|suoritin|tehtävienhallinta)\b/i.test(text)) return "fi";
  return S.language || "en";
}
function R(l,en,ru,fi){ return l==="ru"?ru:l==="fi"?fi:en; }

function isSlowContext(){
  return S.procedure==="slow_pc" ||
         S.rootProblem==="slow_pc" ||
         S.issue==="slow_pc" ||
         S.currentSymptom==="slow_pc";
}

function awaitingTaskManagerAnswer(){
  const q=String(S.lastQuestion||"");
  const i=String(S.lastInstruction||"");
  const p=String(S.procedureStep||"");
  return isSlowContext() && (
    q==="slow_resource_report" ||
    q==="task_manager_result" ||
    q==="slow_task_manager" ||
    p==="task_manager" ||
    i==="slow_task_manager" ||
    i==="check_task_manager"
  );
}

function processName(text){
  const t=clean(text);

  const known=[
    ["chrome", /\b(chrome|google chrome|хром|гугл хром)\b/i],
    ["edge", /\b(edge|microsoft edge|эдж)\b/i],
    ["firefox", /\b(firefox|mozilla|фаерфокс|мозилла)\b/i],
    ["opera", /\b(opera|опера)\b/i],
    ["browser", /\b(browser|браузер|selain)\b/i],
    ["discord", /\b(discord|дискорд)\b/i],
    ["steam", /\bsteam\b/i],
    ["teams", /\b(teams|microsoft teams)\b/i],
    ["antimalware service executable", /\b(antimalware|defender)\b/i],
    ["onedrive", /\b(one ?drive|ван ?драйв)\b/i]
  ];

  for(const [name,re] of known){
    if(re.test(t)) return name;
  }

  // A short app/process-looking answer after Task Manager can be accepted
  // as an observation even if ANITA has never heard the program name before.
  const words=t.split(/\s+/).filter(Boolean);
  const forbidden=/^(cpu|ram|memory|disk|цп|память|диск|muisti|levy|suoritin|\d+|процент|percent|%|mb|gb|мб|гб)$/i;
  if(words.length>=1 && words.length<=5 && !words.every(w=>forbidden.test(w))){
    return t;
  }
  return null;
}

function metricReport(text){
  const t=clean(text);

  let metric=null;
  if(/\b(cpu|processor|цп|процессор|suoritin)\b/i.test(t)) metric="cpu";
  else if(/\b(memory|ram|память|оператив\w*|muisti)\b/i.test(t)) metric="memory";
  else if(/\b(disk|диск|levy)\b/i.test(t)) metric="disk";

  const pct=t.match(/(\d{1,3})\s*%?/);
  let value=pct ? Number(pct[1]) : null;

  // Avoid treating "8 GB RAM" as 8% if there is a GB/MB unit.
  if(/\b\d+(?:[.,]\d+)?\s*(gb|гб|mb|мб|gt|mt)\b/i.test(t) && !/%/.test(t)){
    value=null;
  }

  return metric ? {metric,value} : null;
}

function memoryAmount(text){
  const t=clean(text);
  const m=t.match(/(\d+(?:[.,]\d+)?)\s*(gb|гб|mb|мб|gt|mt)\b/i);
  if(!m) return null;
  return {value:Number(m[1].replace(",",".")),unit:m[2].toLowerCase()};
}

function rememberObservation(process){
  S.observationProcess=process;
  S.rootProblem="slow_pc";
  S.issue="slow_pc";
  S.currentSymptom="slow_pc";
  S.procedure="slow_pc";
  S.procedureStep="task_manager";
  S.lastQuestion="process_resource_detail";
  S.lastInstruction="inspect_process_resource";
  S.awaitingResult=true;

  if(!S.observations || !Array.isArray(S.observations)) S.observations=[];
  S.observations.push({
    type:"task_manager_process",
    process:process,
    at:Date.now()
  });
  if(S.observations.length>20) S.observations=S.observations.slice(-20);
}

function processObservationAnswer(process,l){
  rememberObservation(process);

  const pretty = process==="browser"
    ? R(l,"the browser","браузер","selain")
    : process;

  const msg=R(l,
`Got it — ${pretty} is at the top of Task Manager. That is useful information, but it does not yet tell us whether it is the cause of the slowdown.

Look at that same row and tell me what is high:
• CPU — and the %
• Memory — and the % or MB/GB

For example: “Memory 85%”, “Chrome 1000 MB”, or “CPU 90%”.`,
`Поняла — ${pretty} находится наверху списка в Диспетчере задач. Это полезное наблюдение, но пока ещё не означает, что именно он является причиной тормозов.

Посмотри на эту же строку и напиши, что у него высокое:
• CPU/ЦП — и %
• Память — и % или МБ/ГБ

Например: «Память 85%», «Chrome 1000 МБ» или «CPU 90%».`,
`Selvä — ${pretty} on Tehtävienhallinnan listan kärjessä. Se on hyödyllinen havainto, mutta ei vielä tarkoita, että juuri se aiheuttaa hidastumisen.

Katso samaa riviä ja kerro mikä on korkea:
• CPU — ja %
• Memory — ja % tai Mt/Gt

Esimerkiksi: “Memory 85 %”, “Chrome 1000 Mt” tai “CPU 90 %”.`);

  S.lastAnswer=msg;
  return {type:"answer",text:msg};
}

function metricAnswer(rep,l){
  S.observationMetric=rep.metric;
  S.observationValue=rep.value;
  S.rootProblem="slow_pc";
  S.issue="slow_pc";
  S.procedure="slow_pc";

  if(rep.metric==="memory"){
    S.procedureStep="memory_pressure";
    S.lastQuestion="memory_process_detail";
    S.lastInstruction="inspect_memory_processes";

    if(rep.value!==null && rep.value>=80){
      const msg=R(l,
`Memory is ${rep.value}%. That is high enough to contribute to the slowdown, but it does not mean the RAM is faulty.

Now sort Task Manager by Memory. Tell me:
1. the top 3 processes and roughly how much memory each uses;
2. how much RAM the PC has in total, for example 8 GB or 16 GB.

If Chrome is one of the biggest users, we can then open Chrome Task Manager with Shift + Esc and find the heavy tab or extension.`,
`Память загружена на ${rep.value}%. Это уже достаточно много и может вызывать тормоза, но это не означает, что оперативная память неисправна.

Теперь отсортируй Диспетчер задач по столбцу «Память». Напиши:
1. три процесса, которые используют больше всего памяти, и примерно сколько каждый;
2. сколько всего RAM установлено — например 8 ГБ или 16 ГБ.

Если среди лидеров Chrome, следующим шагом откроем его внутренний диспетчер через Shift + Esc и найдём тяжёлую вкладку или расширение.`,
`Muistin käyttö on ${rep.value} %. Se on riittävän korkea hidastamaan konetta, mutta se ei tarkoita, että RAM olisi viallinen.

Lajittele Tehtävienhallinta Memory-sarakkeen mukaan. Kerro:
1. kolme eniten muistia käyttävää prosessia ja niiden likimääräinen käyttö;
2. paljonko RAM-muistia koneessa on yhteensä, esimerkiksi 8 Gt tai 16 Gt.

Jos Chrome on suurimpien joukossa, seuraavaksi voimme avata Chromen oman tehtävienhallinnan Shift + Esc -näppäimillä ja etsiä raskaan välilehden tai laajennuksen.`);
      S.lastAnswer=msg;
      return {type:"answer",text:msg};
    }

    const msg=R(l,
      `Memory is ${rep.value!==null?rep.value+"%":"the high resource you noticed"}. Tell me how much total RAM the PC has and which three processes are using the most memory.`,
      `Память ${rep.value!==null?"загружена на "+rep.value+"%":"— тот ресурс, который ты заметил"}. Напиши, сколько всего RAM установлено и какие три процесса используют больше всего памяти.`,
      `Muisti ${rep.value!==null?"on "+rep.value+" %":"on havaitsemasi korkea resurssi"}. Kerro RAM-muistin kokonaismäärä ja kolme eniten muistia käyttävää prosessia.`);
    S.lastAnswer=msg;
    return {type:"answer",text:msg};
  }

  if(rep.metric==="cpu"){
    S.procedureStep="cpu_pressure";
    S.lastQuestion="cpu_process_detail";
    const high=rep.value!==null && rep.value>=85;
    const msg=R(l,
      `${rep.value!==null?"CPU is "+rep.value+"%. ":""}${high?"That is high enough to slow the PC. ":""}Sort Task Manager by CPU and tell me the top 3 processes and their CPU percentages.`,
      `${rep.value!==null?"CPU загружен на "+rep.value+"%. ":""}${high?"Это достаточно высокая нагрузка и она может тормозить ПК. ":""}Отсортируй Диспетчер задач по CPU и напиши три процесса с самой высокой загрузкой и их проценты.`,
      `${rep.value!==null?"CPU on "+rep.value+" %. ":""}${high?"Se on riittävän korkea hidastamaan konetta. ":""}Lajittele Tehtävienhallinta CPU:n mukaan ja kerro kolme eniten CPU:ta käyttävää prosessia prosentteineen.`);
    S.lastAnswer=msg;
    return {type:"answer",text:msg};
  }

  if(rep.metric==="disk"){
    S.procedureStep="disk_pressure";
    S.lastQuestion="disk_process_detail";
    const msg=R(l,
      `${rep.value!==null?"Disk is "+rep.value+"%. ":""}Sort Task Manager by Disk and tell me the top 3 processes. If Disk stays near 100% for several minutes, that can directly cause severe slowness.`,
      `${rep.value!==null?"Диск загружен на "+rep.value+"%. ":""}Отсортируй Диспетчер задач по «Диск» и напиши три процесса наверху. Если диск несколько минут держится около 100%, это действительно может сильно тормозить компьютер.`,
      `${rep.value!==null?"Disk on "+rep.value+" %. ":""}Lajittele Tehtävienhallinta Disk-sarakkeen mukaan ja kerro kolme ylintä prosessia. Jos levy pysyy lähellä 100 % useita minuutteja, se voi suoraan aiheuttaa voimakasta hidastumista.`);
    S.lastAnswer=msg;
    return {type:"answer",text:msg};
  }

  return null;
}

function amountAfterProcess(text,l){
  if(!isSlowContext() || !S.observationProcess) return null;
  const amt=memoryAmount(text);
  if(!amt) return null;

  S.procedureStep="memory_process_amount";
  S.lastQuestion="memory_total_or_other_processes";

  const process=S.observationProcess;
  const pretty=process==="browser"
    ? R(l,"The browser","Браузер","Selain")
    : process;

  const msg=R(l,
`${pretty} is using about ${amt.value} ${amt.unit.toUpperCase()}. That can be normal or high depending on your total RAM and what the browser is doing.

Tell me:
1. total RAM in the PC (for example 8 GB);
2. the overall Memory percentage in Task Manager.

If this is Chrome, you can also press Shift + Esc inside Chrome to see which tab or extension is using the most memory.`,
`${pretty} использует примерно ${amt.value} ${amt.unit.toUpperCase()}. Это может быть как нормально, так и много — зависит от общего объёма RAM и того, что открыто в браузере.

Напиши:
1. сколько всего RAM в компьютере, например 8 ГБ;
2. общий процент «Память» в Диспетчере задач.

Если это Chrome, можно также нажать Shift + Esc внутри Chrome и посмотреть, какая вкладка или расширение использует больше всего памяти.`,
`${pretty} käyttää noin ${amt.value} ${amt.unit.toUpperCase()}. Se voi olla normaalia tai paljon riippuen RAM-muistin kokonaismäärästä ja selaimen sisällöstä.

Kerro:
1. RAM-muistin kokonaismäärä, esimerkiksi 8 Gt;
2. Memory-kokonaisprosentti Tehtävienhallinnassa.

Jos kyseessä on Chrome, voit myös painaa Chromessa Shift + Esc ja katsoa mikä välilehti tai laajennus käyttää eniten muistia.`);
  S.lastAnswer=msg;
  return {type:"answer",text:msg};
}

V.handle=function(text,l){
  const language=langOf(text);

  // 1) A metric/result should beat glossary matching.
  if(isSlowContext()){
    const rep=metricReport(text);
    if(rep){
      const ans=metricAnswer(rep,language);
      if(ans) return ans;
    }

    const amt=amountAfterProcess(text,language);
    if(amt) return amt;
  }

  // 2) If ANITA just asked for Task Manager findings, a process/app name
  // is an ANSWER TO THAT QUESTION, not a brand-new browser question.
  if(awaitingTaskManagerAnswer()){
    const p=processName(text);
    if(p){
      return processObservationAnswer(p,language);
    }
  }

  return old(text,l);
};

window.ANITA_V14_1={
  version:"14.1",
  awaitingTaskManagerAnswer,
  processName,
  metricReport
};

console.log("[ANITA v14.1] Answer-to-Question Context Router loaded");
})();

/* ================= ANITA v14.2 GENERIC PROBLEM INTENT ROUTER =================
   Fixes vague problem reports such as:
   - "Проблема с компом"
   - "Проблема с компьютером"
   - "something is wrong with my pc"
   - "my computer has a problem"
   - "koneessa on ongelma"

   Behavior:
   - recognizes the device/object
   - recognizes that user is reporting a problem
   - if symptom is missing, asks a short guided clarification
   - does NOT fall into the old generic fallback
   - keeps the conversation ready for the next symptom
   - supports RU / EN / FI and common slang
   =========================================================================== */
(function(){
"use strict";

if(!window.ANITA_V12 || typeof window.ANITA_V12.handle!=="function") return;

const V = window.ANITA_V12;
const old = V.handle.bind(V);
const S = V.state;

S.awaitingGenericSymptom = S.awaitingGenericSymptom || false;
S.genericProblemDevice = S.genericProblemDevice || null;

function clean(s){
  return (s||"")
    .toLowerCase()
    .replace(/[’`]/g,"'")
    .replace(/[?!.,:;()[\]{}"“”]/g," ")
    .replace(/\s+/g," ")
    .trim();
}

function langOf(text){
  if(/[а-яё]/i.test(text)) return "ru";
  if(/[äöå]/i.test(text) || /\b(kone|tietokone|läppäri|ongelma)\b/i.test(text)) return "fi";
  return S.language || "en";
}

function R(l,en,ru,fi){ return l==="ru"?ru:l==="fi"?fi:en; }

function detectDevice(text){
  const t=clean(text);

  if(/\b(компьютер|комп|компик|пк|ноут|ноутбук)\b/i.test(t)) return "computer";
  if(/\b(pc|computer|desktop|machine|rig|laptop|notebook)\b/i.test(t)) return "computer";
  if(/\b(tietokone|kone|pc|läppäri)\b/i.test(t)) return "computer";

  if(/\b(монитор|экран|monitor|screen|display|näyttö)\b/i.test(t)) return "display";
  if(/\b(принтер|printer|tulostin)\b/i.test(t)) return "printer";
  if(/\b(интернет|wifi|wi fi|вайфай|internet|netti|verkko)\b/i.test(t)) return "internet";
  if(/\b(браузер|browser|chrome|edge|firefox|selain)\b/i.test(t)) return "browser";
  return null;
}

function hasProblemIntent(text){
  const t=clean(text);
  return (
    /\b(проблема|неполадка|что то не так|что-то не так|сломал\w*|глючит)\b/i.test(t) ||
    /\b(problem|issue|something wrong|not right|trouble|acting weird|glitching)\b/i.test(t) ||
    /\b(ongelma|vika|jotain vialla|ei kunnossa)\b/i.test(t)
  );
}

function hasSpecificSymptom(text){
  const t=clean(text);

  return (
    /\b(медленно|тормозит|лагает|зависает|завис|не включается|не запускается|перезагружается|выключается|нет изображения|черный экран|чёрный экран|не работает|пропал интернет|нет интернета|шумит|греется|перегревается|ошибка|синий экран)\b/i.test(t) ||
    /\b(slow|sluggish|lagging|freezes|freezing|crashes|won't start|wont start|won't turn on|wont turn on|restarts|shuts down|no display|black screen|no internet|not working|overheating|error|blue screen)\b/i.test(t) ||
    /\b(hidas|lagaa|jäätyy|kaatuu|ei käynnisty|sammuu|käynnistyy uudelleen|ei kuvaa|musta näyttö|ei internetiä|ei nettiä|ei toimi|ylikuumenee|virhe)\b/i.test(t)
  );
}

function genericProblemIntent(text){
  const dev=detectDevice(text);
  if(!dev) return null;
  if(!hasProblemIntent(text)) return null;
  if(hasSpecificSymptom(text)) return null;
  return dev;
}

function askSymptom(device,l){
  S.awaitingGenericSymptom=true;
  S.genericProblemDevice=device;
  S.rootProblem=null;
  S.issue=null;
  S.currentSymptom=null;
  S.lastQuestion="generic_symptom";
  S.lastInstruction="describe_symptom";
  S.language=l;

  let msg;

  if(device==="computer"){
    msg=R(l,
`Got it — there is a problem with the computer.

What exactly is happening?
For example: is it slow, freezing, not turning on, restarting, showing no picture, losing Internet, or doing something else?

You can describe it in your own words.`,
`Поняла — проблема именно с компьютером.

Что конкретно происходит?
Например: он медленно работает, зависает, не включается, перезагружается, нет изображения, пропадает интернет или происходит что-то другое?

Можешь просто описать своими словами.`,
`Selvä — tietokoneessa on ongelma.

Mitä tarkalleen tapahtuu?
Esimerkiksi: onko se hidas, jäätyykö se, eikö se käynnisty, käynnistyykö se uudelleen, puuttuuko kuva, katkeaako Internet vai tapahtuuko jotain muuta?

Voit kuvailla omin sanoin.`);
  } else if(device==="display"){
    msg=R(l,
`Got it — the problem is with the monitor/display. What exactly happens: no picture, flickering, wrong resolution, “No signal”, or something else?`,
`Поняла — проблема с монитором/экраном. Что именно происходит: нет изображения, мигает, неправильное разрешение, пишет «Нет сигнала» или что-то другое?`,
`Selvä — ongelma liittyy näyttöön. Mitä tarkalleen tapahtuu: ei kuvaa, välkkyy, väärä resoluutio, “No signal” vai jotain muuta?`);
  } else if(device==="printer"){
    msg=R(l,
`Got it — the problem is with the printer. Does it not print, is it offline, is there a paper/error message, or something else?`,
`Поняла — проблема с принтером. Он не печатает, показывает «Offline», пишет ошибку/замятие бумаги или происходит что-то другое?`,
`Selvä — ongelma liittyy tulostimeen. Eikö se tulosta, näkyykö Offline-tila, paperi-/virheilmoitus vai jotain muuta?`);
  } else if(device==="internet"){
    msg=R(l,
`Got it — the problem is with the Internet. Is there no connection at all, is it slow, does Wi‑Fi disconnect, or does only one device/app have the problem?`,
`Поняла — проблема с интернетом. Интернета нет совсем, он медленный, Wi‑Fi отключается или проблема только на одном устройстве/в одной программе?`,
`Selvä — ongelma liittyy Internetiin. Puuttuuko yhteys kokonaan, onko se hidas, katkeaako Wi‑Fi vai onko ongelma vain yhdessä laitteessa/ohjelmassa?`);
  } else {
    msg=R(l,
`Got it. What exactly is happening? Describe the symptom in your own words.`,
`Поняла. Что именно происходит? Опиши симптом своими словами.`,
`Selvä. Mitä tarkalleen tapahtuu? Kuvaile oire omin sanoin.`);
  }

  S.lastAnswer=msg;
  return {type:"answer",text:msg};
}

function looksLikeSymptomReply(text){
  const t=clean(text);
  if(!t) return false;

  // If the user replies after ANITA asked "what exactly happens?",
  // almost any short descriptive phrase should be treated as the symptom,
  // not discarded by the generic fallback.
  if(hasSpecificSymptom(t)) return true;

  const genericDescriptive = [
    /\b(странно|глючит|тупит|плохо работает|иногда|сам по себе|что то происходит|что-то происходит)\b/i,
    /\b(weird|acting weird|sometimes|randomly|bad|badly|something happens)\b/i,
    /\b(outo|oudosti|joskus|satunnaisesti|huonosti)\b/i
  ];

  if(genericDescriptive.some(r=>r.test(t))) return true;

  // Accept reasonably short free-form symptom descriptions.
  const words=t.split(/\s+/);
  return words.length>=2 && words.length<=20;
}

V.handle=function(text,l){
  const language=langOf(text);

  // 1) Vague "problem with my computer" should ask for the missing symptom.
  const generic=genericProblemIntent(text);
  if(generic){
    return askSymptom(generic,language);
  }

  // 2) If ANITA just asked for the symptom, preserve that conversational state.
  // Let old handlers recognize concrete known symptoms first, but if they fail,
  // respond contextually instead of the old giant fallback.
  if(S.awaitingGenericSymptom && looksLikeSymptomReply(text)){
    S.awaitingGenericSymptom=false;

    const result=old(text,l);

    // Detect the known generic fallback by its wording.
    const fallbackText = result && typeof result.text==="string" ? result.text.toLowerCase() : "";
    const looksFallback =
      fallbackText.includes("я пока не до конца поняла") ||
      fallbackText.includes("i'm not fully sure what you mean") ||
      fallbackText.includes("i am not fully sure what you mean") ||
      fallbackText.includes("en ole vielä täysin varma");

    if(!looksFallback){
      return result;
    }

    const msg=R(language,
`Okay, I understand that as the symptom of the current ${S.genericProblemDevice==="computer"?"computer":"device"} problem.

Tell me one more thing: when did it start, and what do you notice most clearly when it happens?`,
`Хорошо, я понимаю это как симптом текущей проблемы с ${S.genericProblemDevice==="computer"?"компьютером":"устройством"}.

Уточни ещё две вещи: когда это началось и что именно ты замечаешь сильнее всего в момент проблемы?`,
`Hyvä, ymmärrän tämän nykyisen ${S.genericProblemDevice==="computer"?"tietokone":"laitteen"} ongelman oireeksi.

Kerro vielä kaksi asiaa: milloin tämä alkoi ja mikä näkyy kaikkein selvimmin silloin kun ongelma tapahtuu?`);

    S.lastQuestion="generic_symptom_detail";
    S.lastAnswer=msg;
    return {type:"answer",text:msg};
  }

  return old(text,l);
};

window.ANITA_V14_2={
  version:"14.2",
  genericProblemIntent,
  detectDevice,
  hasProblemIntent,
  hasSpecificSymptom
};

console.log("[ANITA v14.2] Generic Problem Intent Router loaded");
})();

/* ================= ANITA v14.3 RUSSIAN SLANG + MORPHOLOGY ROUTER =================
   Fixes Russian natural/slang device forms that strict word boundaries miss:
   комп, компа, компу, компом, компе, компы, компик...
   компьютер, компьютером, компьютере...
   ноут, ноута, ноутом...
   ПК / PC.

   Examples now treated as vague computer-problem intent:
   "Проблема с компом"
   "Что-то с компом"
   "С компом проблема"
   "У меня с компом что-то не так"
   "Проблемы с компьютером"
   "Что-то не так с ноутом"

   This runs before older fallback handlers.
   ================================================================================ */
(function(){
"use strict";

if(!window.ANITA_V12 || typeof window.ANITA_V12.handle!=="function") return;

const V = window.ANITA_V12;
const old = V.handle.bind(V);
const S = V.state;

function clean(s){
  return (s||"")
    .toLowerCase()
    .replace(/[ё]/g,"е")
    .replace(/[’`]/g,"'")
    .replace(/[?!.,:;()[\]{}"“”]/g," ")
    .replace(/\s+/g," ")
    .trim();
}
function R(l,en,ru,fi){ return l==="ru"?ru:l==="fi"?fi:en; }

function ruComputerMention(text){
  const t=clean(text);
  // Stems intentionally allow Russian case endings.
  return /(^|\s)(комп(ьютер)?\w*|компик\w*|пк|ноут\w*)(\s|$)/i.test(t);
}

function ruProblemMention(text){
  const t=clean(text);
  return (
    /(^|\s)проблем\w*(\s|$)/i.test(t) ||
    /(^|\s)неполад\w*(\s|$)/i.test(t) ||
    /что\s*то\s+не\s+так/i.test(t) ||
    /не\s+так\s+с/i.test(t) ||
    /с\s+.+\s+что\s*то/i.test(t) ||
    /глюч\w*/i.test(t)
  );
}

function ruSpecificSymptom(text){
  const t=clean(text);
  return (
    /медлен\w*|тормоз\w*|лага\w*|туп\w*|зависа\w*|не\s+включ\w*|не\s+запуска\w*|перезагружа\w*|выключа\w*|нет\s+изображ\w*|черн\w*\s+экран|не\s+работа\w*|нет\s+интернет\w*|пропал\w*\s+интернет|гре\w*|перегрева\w*|ошиб\w*|син\w*\s+экран|шум\w*/i
  ).test(t);
}

function isVagueRuComputerProblem(text){
  return ruComputerMention(text) && ruProblemMention(text) && !ruSpecificSymptom(text);
}

function askRuComputerSymptom(){
  S.awaitingGenericSymptom=true;
  S.genericProblemDevice="computer";
  S.rootProblem=null;
  S.issue=null;
  S.currentSymptom=null;
  S.lastQuestion="generic_symptom";
  S.lastInstruction="describe_symptom";
  S.language="ru";

  const msg=`Поняла — проблема с компьютером.

Что именно происходит?
Например: он медленно работает, зависает, не включается, перезагружается, нет изображения, пропадает интернет или происходит что-то другое?

Можешь описать своими словами — необязательно использовать точные технические термины.`;

  S.lastAnswer=msg;
  return {type:"answer",text:msg};
}

V.handle=function(text,l){
  // Highest-priority Russian morphology/slang route.
  if(isVagueRuComputerProblem(text)){
    return askRuComputerSymptom();
  }

  return old(text,l);
};

window.ANITA_V14_3={
  version:"14.3",
  ruComputerMention,
  ruProblemMention,
  ruSpecificSymptom,
  isVagueRuComputerProblem
};

console.log("[ANITA v14.3] Russian Slang + Morphology Router loaded");
})();

/* ================= ANITA v15 KNOWLEDGE + ERROR UNDERSTANDING CORE =================
   Major knowledge/skills upgrade for home-user IT support.

   Adds:
   1) Russian + English computer slang normalization before intent routing.
   2) Russian morphology for common device words/cases.
   3) Mixed-language technical error handling:
      if UI language is RU/FI and the pasted error is English, ANITA keeps
      answering in the selected language.
   4) Common HTTP error knowledge (400/401/403/404/408/409/410/413/414/415/
      429/500/501/502/503/504).
   5) Common browser/network error patterns:
      ERR_NAME_NOT_RESOLVED, ERR_INTERNET_DISCONNECTED,
      ERR_CONNECTION_TIMED_OUT, ERR_CONNECTION_RESET,
      ERR_CONNECTION_REFUSED, ERR_SSL_PROTOCOL_ERROR,
      ERR_CERT_DATE_INVALID, DNS_PROBE_FINISHED_NXDOMAIN,
      "Aw, Snap!", "This site can't be reached".
   6) Windows error-pattern understanding:
      hexadecimal codes 0x........, HRESULT-like errors,
      BSOD/STOP CODE, PAGE_FAULT_IN_NONPAGED_AREA, MEMORY_MANAGEMENT,
      DRIVER_IRQL_NOT_LESS_OR_EQUAL, CRITICAL_PROCESS_DIED,
      INACCESSIBLE_BOOT_DEVICE, SYSTEM_SERVICE_EXCEPTION,
      DPC_WATCHDOG_VIOLATION, WHEA_UNCORRECTABLE_ERROR.
   7) Generic technical-error language:
      "Something went wrong", "Internal error", "Unexpected error",
      "Access denied", "Permission denied", "File not found",
      "Not enough memory", "Out of memory", "No space left",
      "Connection failed", "Timeout", "Fatal error", "Exception".
   8) Disk-space vs performance reasoning:
      "increase/free disk space" -> cleanup, Storage Sense, temporary files,
      unused apps, large files; defrag does NOT free space.
      "speed up HDD/defragment" -> Windows Optimize Drives instructions.
      SSD -> Windows Optimize/Trim, do not recommend repeated manual defrag.
   9) Error fallback improvement:
      unfamiliar pasted error/code -> identify it as technical evidence and
      ask targeted context questions instead of "I don't understand".

   This module is deterministic. It does not claim to know every error code.
   ================================================================================ */
(function(){
"use strict";

if(!window.ANITA_V12 || typeof window.ANITA_V12.handle!=="function") return;

const V = window.ANITA_V12;
const old = V.handle.bind(V);
const S = V.state;

/* ---------- language handling ---------- */

function clean(s){
  return String(s||"")
    .toLowerCase()
    .replace(/[ё]/g,"е")
    .replace(/[’`]/g,"'")
    .replace(/\s+/g," ")
    .trim();
}

function selectedLang(text){
  // Respect an explicitly/manual selected language if the surrounding ANITA
  // state exposes one. This is intentionally checked BEFORE script detection,
  // because a Russian-speaking user may paste an English Windows/browser error.
  const candidates = [
    S.manualLanguage, S.selectedLanguage, S.language, S.lang,
    window.ANITA_LANGUAGE, window.anitaLanguage
  ];
  for(const x of candidates){
    const v=String(x||"").toLowerCase();
    if(v==="ru" || v==="en" || v==="fi") return v;
    if(v.startsWith("ru")) return "ru";
    if(v.startsWith("en")) return "en";
    if(v.startsWith("fi")) return "fi";
  }

  // Only infer language when there is no stored/selected language.
  if(/[а-яё]/i.test(text||"")) return "ru";
  if(/[äöå]/i.test(text||"")) return "fi";
  return "en";
}

function R(l,en,ru,fi){
  return l==="ru" ? ru : l==="fi" ? fi : en;
}

/* ---------- slang + morphology normalization ---------- */

const SLANG_RULES = [
  // Russian computer/device
  [/(^|\s)(компьютер\w*|компик\w*|комп\w*|пк)(?=\s|$)/gi, "$1 computer "],
  [/(^|\s)(ноутбук\w*|ноутик\w*|ноут\w*)(?=\s|$)/gi, "$1 laptop "],
  [/(^|\s)(винда|виндовс|виндами|винде|винду|виндой)(?=\s|$)/gi, "$1 windows "],
  [/(^|\s)(оперативка|оперативы|оперативку|оперативной|рам|озу)(?=\s|$)/gi, "$1 ram "],
  [/(^|\s)(видюха|видяха|видеокарта|гпу)(?=\s|$)/gi, "$1 gpu "],
  [/(^|\s)(проц|процик|процессор|цп)(?=\s|$)/gi, "$1 cpu "],
  [/(^|\s)(материнка|мать|материнская плата)(?=\s|$)/gi, "$1 motherboard "],
  [/(^|\s)(хард|жесткий диск|жёсткий диск|винчестер)(?=\s|$)/gi, "$1 hdd "],
  [/(^|\s)(ссд|эсэсди)(?=\s|$)/gi, "$1 ssd "],
  [/(^|\s)(инет|интернетик|сеть)(?=\s|$)/gi, "$1 internet "],
  [/(^|\s)(вай ?фай|вафля)(?=\s|$)/gi, "$1 wifi "],
  [/(^|\s)(браузер|хром|гугл хром)(?=\s|$)/gi, "$1 browser "],
  [/(^|\s)(тормозит|тупит|лагает|подлагивает|тормозной)(?=\s|$)/gi, "$1 slow "],
  [/(^|\s)(вылетает|крашится|крашит)(?=\s|$)/gi, "$1 crash "],
  [/(^|\s)(зависает|фризит|фризится)(?=\s|$)/gi, "$1 freeze "],
  [/(^|\s)(глючит|чудит|ведет себя странно|ведёт себя странно)(?=\s|$)/gi, "$1 weird "],

  // English computer/device slang
  [/\b(pc|desktop|computer|machine|rig|box)\b/gi, " computer "],
  [/\b(laptop|notebook|lappy)\b/gi, " laptop "],
  [/\b(win|windows|win11|win10)\b/gi, " windows "],
  [/\b(ram|memory|mem)\b/gi, " ram "],
  [/\b(gpu|graphics card|video card)\b/gi, " gpu "],
  [/\b(cpu|processor|chip)\b/gi, " cpu "],
  [/\b(mobo|motherboard)\b/gi, " motherboard "],
  [/\b(hard drive|harddrive|hdd|spinning drive)\b/gi, " hdd "],
  [/\b(solid state drive|ssd)\b/gi, " ssd "],
  [/\b(net|internet|connection)\b/gi, " internet "],
  [/\b(wifi|wi-fi|wireless)\b/gi, " wifi "],
  [/\b(browser|chrome|edge|firefox|opera)\b/gi, " browser "],
  [/\b(laggy|lagging|sluggish|slow as hell|slow af)\b/gi, " slow "],
  [/\b(crashing|crashes|crash)\b/gi, " crash "],
  [/\b(freezing|freezes|frozen|hangs|hanging)\b/gi, " freeze "],
  [/\b(acting weird|glitchy|glitching|buggy)\b/gi, " weird "]
];

function normalizeSlang(text){
  let t=" "+String(text||"")+" ";
  for(const [re,to] of SLANG_RULES) t=t.replace(re,to);
  return t.replace(/\s+/g," ").trim();
}

/* ---------- HTTP knowledge ---------- */

const HTTP = {
  400:{name:"Bad Request",kind:"client",
    en:"The server rejected the request because it was malformed or invalid.",
    ru:"Сервер отклонил запрос как некорректный или неправильно сформированный.",
    fi:"Palvelin hylkäsi pyynnön virheellisenä tai väärin muodostettuna."},
  401:{name:"Unauthorized",kind:"auth",
    en:"The service requires valid authentication or your login/session is not accepted.",
    ru:"Сервис требует корректную авторизацию, либо текущий вход/сеанс не принят.",
    fi:"Palvelu vaatii kelvollisen tunnistautumisen tai nykyinen kirjautuminen ei kelpaa."},
  403:{name:"Forbidden",kind:"permission",
    en:"The server understood the request but refuses access.",
    ru:"Сервер понял запрос, но не разрешает доступ.",
    fi:"Palvelin ymmärsi pyynnön, mutta estää pääsyn."},
  404:{name:"Not Found",kind:"notfound",
    en:"The requested page or resource was not found at that address.",
    ru:"Страница или ресурс по этому адресу не найдены.",
    fi:"Pyydettyä sivua tai resurssia ei löytynyt tästä osoitteesta."},
  408:{name:"Request Timeout",kind:"timeout",
    en:"The request took too long and timed out.",
    ru:"Запрос выполнялся слишком долго и был прерван по тайм-ауту.",
    fi:"Pyyntö kesti liian kauan ja aikakatkaistiin."},
  409:{name:"Conflict",kind:"conflict",
    en:"The request conflicts with the current state of the resource.",
    ru:"Запрос конфликтует с текущим состоянием ресурса.",
    fi:"Pyyntö on ristiriidassa resurssin nykytilan kanssa."},
  410:{name:"Gone",kind:"notfound",
    en:"The resource is no longer available and was intentionally removed.",
    ru:"Ресурс больше недоступен и был удалён.",
    fi:"Resurssi ei ole enää saatavilla ja se on poistettu."},
  413:{name:"Content Too Large",kind:"size",
    en:"The upload/request is larger than the server allows.",
    ru:"Файл или запрос превышает допустимый сервером размер.",
    fi:"Lähetys tai pyyntö on suurempi kuin palvelin sallii."},
  414:{name:"URI Too Long",kind:"request",
    en:"The web address/request URI is too long for the server.",
    ru:"Адрес/URI запроса слишком длинный для сервера.",
    fi:"Osoite/URI on palvelimelle liian pitkä."},
  415:{name:"Unsupported Media Type",kind:"format",
    en:"The server does not accept the submitted file/content format.",
    ru:"Сервер не принимает отправленный формат файла или данных.",
    fi:"Palvelin ei hyväksy lähetettyä tiedosto- tai sisältömuotoa."},
  429:{name:"Too Many Requests",kind:"rate",
    en:"Too many requests were sent in a short time; the service is rate-limiting you.",
    ru:"За короткое время отправлено слишком много запросов, и сервис временно ограничил их.",
    fi:"Pyyntöjä lähetettiin liian monta lyhyessä ajassa, joten palvelu rajoittaa niitä."},
  500:{name:"Internal Server Error",kind:"server",
    en:"The website/server failed internally. This is usually server-side rather than a problem with your PC.",
    ru:"На сайте/сервере произошла внутренняя ошибка. Обычно это проблема сервера, а не вашего ПК.",
    fi:"Sivustolla/palvelimella tapahtui sisäinen virhe. Se on yleensä palvelinpuolen ongelma, ei tietokoneesi vika."},
  501:{name:"Not Implemented",kind:"server",
    en:"The server does not support the requested function.",
    ru:"Сервер не поддерживает запрошенную функцию.",
    fi:"Palvelin ei tue pyydettyä toimintoa."},
  502:{name:"Bad Gateway",kind:"server",
    en:"A gateway/proxy received an invalid response from another server.",
    ru:"Шлюз или прокси получил некорректный ответ от другого сервера.",
    fi:"Yhdyskäytävä tai välityspalvelin sai virheellisen vastauksen toiselta palvelimelta."},
  503:{name:"Service Unavailable",kind:"server",
    en:"The service is temporarily unavailable, overloaded, or under maintenance.",
    ru:"Сервис временно недоступен, перегружен или находится на обслуживании.",
    fi:"Palvelu on tilapäisesti pois käytöstä, ylikuormitettu tai huollossa."},
  504:{name:"Gateway Timeout",kind:"server",
    en:"A gateway/proxy did not receive a response from another server in time.",
    ru:"Шлюз или прокси не дождался ответа от другого сервера.",
    fi:"Yhdyskäytävä tai välityspalvelin ei saanut vastausta toiselta palvelimelta ajoissa."}
};

function findHttp(text){
  const t=String(text||"");
  const m=t.match(/(?:http(?:\/\d(?:\.\d)?)?\s*)?(?:error\s*)?\b(400|401|403|404|408|409|410|413|414|415|429|500|501|502|503|504)\b/i);
  if(!m) return null;
  const code=Number(m[1]);
  return HTTP[code] ? {code,...HTTP[code]} : null;
}

function httpAdvice(h,l){
  let next;
  if(h.kind==="server"){
    next=R(l,
      "Try reloading once, then wait a few minutes and try again. If other websites work, the problem is probably on that service's side.",
      "Обнови страницу один раз, затем подожди несколько минут и попробуй снова. Если другие сайты работают, проблема, скорее всего, на стороне этого сервиса.",
      "Päivitä sivu kerran, odota sitten muutama minuutti ja kokeile uudelleen. Jos muut sivustot toimivat, ongelma on todennäköisesti palvelun puolella.");
  } else if(h.kind==="notfound"){
    next=R(l,
      "Check the address/link for a typo and try opening the site's main page. If the link used to work, the page may have been moved or removed.",
      "Проверь адрес/ссылку на опечатки и попробуй открыть главную страницу сайта. Если ссылка раньше работала, страницу могли переместить или удалить.",
      "Tarkista osoite/linkki kirjoitusvirheiden varalta ja kokeile sivuston etusivua. Jos linkki toimi aiemmin, sivu on voitu siirtää tai poistaa.");
  } else if(h.kind==="auth" || h.kind==="permission"){
    next=R(l,
      "Check that you're signed into the correct account and that the account has access. If this is a work/school service, permissions may need to be granted by the owner/admin.",
      "Проверь, что ты вошёл в правильный аккаунт и у него есть доступ. Для рабочего/учебного сервиса права иногда должен выдать владелец или администратор.",
      "Tarkista, että olet kirjautunut oikealle tilille ja että sillä on käyttöoikeus. Työ-/oppilaitospalvelussa omistajan tai ylläpitäjän voi olla tarpeen myöntää oikeudet.");
  } else if(h.kind==="rate"){
    next=R(l,
      "Stop retrying for a while and try again later. Repeated refreshes can keep the temporary limit active.",
      "Не повторяй запрос много раз подряд; подожди и попробуй позже. Постоянные обновления страницы могут продлевать ограничение.",
      "Älä yritä jatkuvasti uudelleen; odota hetki ja kokeile myöhemmin. Toistuvat päivitykset voivat pitää rajoituksen aktiivisena.");
  } else {
    next=R(l,
      "Tell me which website/app showed this and what you were trying to do when it appeared.",
      "Напиши, какой сайт/программа показали эту ошибку и что ты пытался сделать в этот момент.",
      "Kerro mikä sivusto/ohjelma näytti virheen ja mitä yritit tehdä sen ilmestyessä.");
  }

  return R(l,
    `HTTP ${h.code} — ${h.name}. ${h.en}\n\n${next}`,
    `HTTP ${h.code} — ${h.name}. ${h.ru}\n\n${next}`,
    `HTTP ${h.code} — ${h.name}. ${h.fi}\n\n${next}`
  );
}

/* ---------- browser/network error knowledge ---------- */

const BROWSER_ERRORS = [
  {
    id:"ERR_NAME_NOT_RESOLVED",
    re:/\bERR_NAME_NOT_RESOLVED\b/i,
    en:"The browser could not resolve the website name to an IP address. This often points to DNS, a mistyped address, or a domain problem.",
    ru:"Браузер не смог преобразовать имя сайта в IP-адрес. Частые причины — DNS, ошибка в адресе или проблема самого домена.",
    fi:"Selain ei pystynyt muuttamaan sivuston nimeä IP-osoitteeksi. Yleisiä syitä ovat DNS, kirjoitusvirhe osoitteessa tai verkkotunnuksen ongelma.",
    ask:"dns"
  },
  {
    id:"DNS_PROBE_FINISHED_NXDOMAIN",
    re:/\bDNS_PROBE_FINISHED_NXDOMAIN\b/i,
    en:"DNS says that the requested domain name does not resolve.",
    ru:"DNS не смог найти указанный домен.",
    fi:"DNS ei löytänyt pyydettyä verkkotunnusta.",
    ask:"dns"
  },
  {
    id:"ERR_INTERNET_DISCONNECTED",
    re:/\bERR_INTERNET_DISCONNECTED\b/i,
    en:"The device currently has no usable Internet connection.",
    ru:"На устройстве сейчас нет рабочего подключения к интернету.",
    fi:"Laitteella ei tällä hetkellä ole toimivaa Internet-yhteyttä.",
    ask:"internet"
  },
  {
    id:"ERR_CONNECTION_TIMED_OUT",
    re:/\b(ERR_CONNECTION_TIMED_OUT|ERR_TIMED_OUT)\b/i,
    en:"The browser waited for the website but did not get a response in time.",
    ru:"Браузер ждал ответ от сайта, но не получил его вовремя.",
    fi:"Selain odotti sivuston vastausta, mutta sitä ei saatu ajoissa.",
    ask:"timeout"
  },
  {
    id:"ERR_CONNECTION_RESET",
    re:/\bERR_CONNECTION_RESET\b/i,
    en:"The connection to the page was interrupted/reset before loading finished.",
    ru:"Соединение со страницей было прервано/сброшено до завершения загрузки.",
    fi:"Yhteys sivuun katkesi tai nollautui ennen latauksen valmistumista.",
    ask:"connection"
  },
  {
    id:"ERR_CONNECTION_REFUSED",
    re:/\bERR_CONNECTION_REFUSED\b/i,
    en:"The destination actively refused the connection. The service may be down, blocked, or not listening on that address/port.",
    ru:"Удалённая сторона отказалась принимать соединение. Сервис может быть выключен, заблокирован или не работать по этому адресу/порту.",
    fi:"Kohde kieltäytyi yhteydestä. Palvelu voi olla pois käytöstä, estetty tai kuunnella eri osoitteessa/portissa.",
    ask:"site"
  },
  {
    id:"ERR_SSL_PROTOCOL_ERROR",
    re:/\bERR_SSL_PROTOCOL_ERROR\b/i,
    en:"The secure HTTPS/TLS connection could not be established correctly.",
    ru:"Не удалось корректно установить защищённое HTTPS/TLS-соединение.",
    fi:"Suojattua HTTPS/TLS-yhteyttä ei voitu muodostaa oikein.",
    ask:"ssl"
  },
  {
    id:"ERR_CERT_DATE_INVALID",
    re:/\bERR_CERT_DATE_INVALID\b/i,
    en:"The website certificate appears expired/not yet valid, or your device date/time may be wrong.",
    ru:"Сертификат сайта выглядит просроченным/ещё не действующим, либо на устройстве установлены неправильные дата и время.",
    fi:"Sivuston varmenne näyttää vanhentuneelta/ei vielä voimassa olevalta, tai laitteen päivämäärä/aika voi olla väärä.",
    ask:"cert"
  },
  {
    id:"AW_SNAP",
    re:/\b(aw,\s*snap|aw snap)\b/i,
    en:"Chrome failed while loading/rendering the page or tab.",
    ru:"Chrome не смог нормально загрузить или обработать страницу/вкладку.",
    fi:"Chrome ei pystynyt lataamaan tai käsittelemään sivua/välilehteä normaalisti.",
    ask:"tabcrash"
  },
  {
    id:"SITE_CANT_BE_REACHED",
    re:/(this site can'?t be reached|site can'?t be reached)/i,
    en:"Chrome could not establish a usable connection to the site.",
    ru:"Chrome не смог установить рабочее соединение с сайтом.",
    fi:"Chrome ei saanut toimivaa yhteyttä sivustoon.",
    ask:"connection"
  }
];

function findBrowserError(text){
  return BROWSER_ERRORS.find(x=>x.re.test(String(text||""))) || null;
}

function browserAdvice(e,l){
  const steps={
    dns:R(l,
      "First check whether other websites open. Then verify the address. If only names fail, try restarting the router/PC and, if needed, flush DNS with `ipconfig /flushdns` in Command Prompt.",
      "Сначала проверь, открываются ли другие сайты, и проверь сам адрес. Если проблема похожа именно на DNS, перезапусти роутер/ПК и при необходимости выполни `ipconfig /flushdns` в Командной строке.",
      "Tarkista ensin avautuvatko muut sivustot ja onko osoite oikein. Jos ongelma näyttää DNS-ongelmalta, käynnistä reititin/PC uudelleen ja tarvittaessa suorita komentokehotteessa `ipconfig /flushdns`."),
    internet:R(l,
      "Check the Wi‑Fi/Ethernet icon and test another website. If every device is offline, check the router/ISP. If only this PC is affected, tell me whether Wi‑Fi still shows connected.",
      "Проверь значок Wi‑Fi/Ethernet и попробуй другой сайт. Если интернета нет на всех устройствах — проверяем роутер/провайдера. Если только на этом ПК — напиши, показывает ли Wi‑Fi «Подключено».",
      "Tarkista Wi‑Fi/Ethernet-kuvake ja kokeile toista sivustoa. Jos kaikki laitteet ovat offline, tarkista reititin/palveluntarjoaja. Jos vain tämä PC kärsii, kerro näkyykö Wi‑Fi edelleen yhdistettynä."),
    timeout:R(l,
      "Try another website. If only one site times out, it may be overloaded/down. If many sites time out, we should check your Internet connection, VPN/proxy and router.",
      "Попробуй другой сайт. Если тайм-аут только на одном — он может быть перегружен/недоступен. Если на многих — проверим интернет, VPN/прокси и роутер.",
      "Kokeile toista sivustoa. Jos vain yksi sivu aikakatkaistaan, se voi olla ruuhkainen/poissa käytöstä. Jos moni sivu aikakatkaistaan, tarkistetaan Internet, VPN/proxy ja reititin."),
    connection:R(l,
      "Tell me whether other websites work and whether you're using a VPN/proxy. Then we can separate a site problem from a connection/security-software problem.",
      "Напиши, работают ли другие сайты и используешь ли VPN/прокси. Так мы отделим проблему сайта от соединения или защитного ПО.",
      "Kerro toimivatko muut sivustot ja käytätkö VPN:ää/proxya. Näin erotamme sivustovian yhteys- tai tietoturvaongelmasta."),
    site:R(l,
      "Check whether the same site opens on your phone using mobile data. If it fails there too, the service itself may be unavailable.",
      "Проверь этот же сайт на телефоне через мобильный интернет. Если и там не открывается, возможно, сам сервис недоступен.",
      "Kokeile samaa sivustoa puhelimella mobiilidatalla. Jos se ei avaudu sielläkään, itse palvelu voi olla poissa käytöstä."),
    ssl:R(l,
      "Check your PC date/time first. Then try another browser. Do not bypass certificate warnings for banking, payment, email or other sensitive sites.",
      "Сначала проверь дату и время на ПК, затем попробуй другой браузер. Не обходи предупреждения сертификата на банковских, платёжных, почтовых и других важных сайтах.",
      "Tarkista ensin PC:n päivämäärä/aika ja kokeile sitten toista selainta. Älä ohita varmennevaroituksia pankki-, maksu-, sähköposti- tai muilla arkaluonteisilla sivustoilla."),
    cert:R(l,
      "Check Windows date/time and time zone. If they are correct and only one website shows this, the site's certificate may be the problem.",
      "Проверь дату, время и часовой пояс Windows. Если они правильные и ошибка только на одном сайте, проблема может быть в сертификате самого сайта.",
      "Tarkista Windowsin päivämäärä, aika ja aikavyöhyke. Jos ne ovat oikein ja vain yksi sivusto näyttää virheen, ongelma voi olla sivuston varmenteessa."),
    tabcrash:R(l,
      "Reload the tab once. If it repeats, close heavy tabs/extensions, restart Chrome, and check whether memory usage is very high.",
      "Перезагрузи вкладку один раз. Если повторяется — закрой тяжёлые вкладки/расширения, перезапусти Chrome и проверь, не слишком ли высокая загрузка памяти.",
      "Lataa välilehti kerran uudelleen. Jos ongelma toistuu, sulje raskaita välilehtiä/laajennuksia, käynnistä Chrome uudelleen ja tarkista onko muistinkäyttö hyvin korkea.")
  };

  return R(l,
    `${e.id}: ${e.en}\n\n${steps[e.ask]||steps.connection}`,
    `${e.id}: ${e.ru}\n\n${steps[e.ask]||steps.connection}`,
    `${e.id}: ${e.fi}\n\n${steps[e.ask]||steps.connection}`
  );
}

/* ---------- Windows / BSOD knowledge ---------- */

const STOP_CODES = [
  ["PAGE_FAULT_IN_NONPAGED_AREA",
   "Windows tried to access memory that should have been available. Possible causes include a driver, RAM problem, storage/page-file issue, or security software.",
   "Windows попыталась обратиться к области памяти, которая должна была быть доступна. Возможны проблемы драйвера, RAM, накопителя/page file или защитного ПО.",
   "Windows yritti käyttää muistialuetta, jonka olisi pitänyt olla käytettävissä. Mahdollisia syitä ovat ajuri, RAM, tallennus/sivutustiedosto tai tietoturvaohjelmisto."],
  ["MEMORY_MANAGEMENT",
   "Windows detected a serious memory-management problem. RAM is one possibility, but drivers/storage/software can also cause it.",
   "Windows обнаружила серьёзную ошибку управления памятью. RAM — одна из возможных причин, но виноваты также могут быть драйверы, накопитель или ПО.",
   "Windows havaitsi vakavan muistinhallintaongelman. RAM on yksi mahdollinen syy, mutta myös ajurit, tallennus tai ohjelmisto voivat aiheuttaa sen."],
  ["DRIVER_IRQL_NOT_LESS_OR_EQUAL",
   "A driver likely accessed memory incorrectly at a high interrupt level.",
   "Вероятно, драйвер некорректно обратился к памяти на высоком уровне прерываний.",
   "Ajuri todennäköisesti käytti muistia virheellisesti korkealla keskeytystasolla."],
  ["CRITICAL_PROCESS_DIED",
   "A critical Windows process stopped unexpectedly.",
   "Критически важный процесс Windows неожиданно завершился.",
   "Kriittinen Windows-prosessi pysähtyi odottamatta."],
  ["INACCESSIBLE_BOOT_DEVICE",
   "Windows lost access to the system/boot drive during startup.",
   "Windows потеряла доступ к системному/загрузочному диску во время запуска.",
   "Windows menetti pääsyn järjestelmä-/käynnistysasemaan käynnistyksen aikana."],
  ["SYSTEM_SERVICE_EXCEPTION",
   "A system service or driver triggered an exception in Windows.",
   "Системная служба или драйвер вызвали исключение в Windows.",
   "Järjestelmäpalvelu tai ajuri aiheutti poikkeuksen Windowsissa."],
  ["DPC_WATCHDOG_VIOLATION",
   "A driver or storage-related operation took too long at a low system level.",
   "Драйвер или операция с накопителем слишком долго выполнялась на низком системном уровне.",
   "Ajuri tai tallennukseen liittyvä toiminto kesti liian kauan matalalla järjestelmätasolla."],
  ["WHEA_UNCORRECTABLE_ERROR",
   "Windows received a serious hardware error report. CPU, RAM, motherboard, power or other hardware can be involved.",
   "Windows получила сообщение о серьёзной аппаратной ошибке. Возможны CPU, RAM, материнская плата, питание или другое железо.",
   "Windows sai vakavan laitteistovirheilmoituksen. Syynä voi olla CPU, RAM, emolevy, virransyöttö tai muu laitteisto."]
];

function findStopCode(text){
  const t=String(text||"").toUpperCase();
  for(const row of STOP_CODES){
    if(t.includes(row[0])) return {id:row[0],en:row[1],ru:row[2],fi:row[3]};
  }
  const generic=t.match(/\bSTOP\s*CODE\s*[:\-]?\s*([A-Z0-9_]+)/);
  return generic ? {id:generic[1],generic:true} : null;
}

function bsodAnswer(sc,l){
  const meaning=sc.generic
    ? R(l,
      "This is a Windows stop/BSOD code. The exact code is useful diagnostic evidence.",
      "Это код остановки Windows/BSOD. Точный код — важная диагностическая информация.",
      "Tämä on Windowsin STOP/BSOD-koodi. Tarkka koodi on hyödyllinen vianmääritystieto.")
    : R(l,sc.en,sc.ru,sc.fi);

  return R(l,
`STOP CODE: ${sc.id}\n${meaning}

If this happened only once, restart and watch whether it returns. If it repeats, tell me:
1. does the same stop code appear every time;
2. what changed recently — Windows update, driver, program or new hardware;
3. the “What failed:” filename if Windows shows one.

Do not start replacing RAM or other hardware only from one stop code — we should confirm the pattern first.`,
`STOP CODE: ${sc.id}\n${meaning}

Если это произошло один раз — перезагрузи ПК и посмотри, повторится ли ошибка. Если повторяется, напиши:
1. всегда ли появляется тот же STOP CODE;
2. что менялось недавно — обновление Windows, драйвер, программа или новое оборудование;
3. строку «What failed:», если Windows её показывает.

Не нужно сразу менять RAM или другое железо только по одному коду — сначала подтвердим закономерность.`,
`STOP CODE: ${sc.id}\n${meaning}

Jos tämä tapahtui vain kerran, käynnistä PC uudelleen ja katso toistuuko virhe. Jos se toistuu, kerro:
1. näkyykö aina sama STOP CODE;
2. mikä muuttui äskettäin — Windows-päivitys, ajuri, ohjelma tai uusi laite;
3. “What failed:” -tiedostonimi, jos Windows näyttää sen.

Älä vaihda RAM-muistia tai muuta laitteistoa yhden koodin perusteella — varmistetaan ensin toistuva kuvio.`);
}

function findHexError(text){
  const m=String(text||"").match(/\b0x[0-9a-fA-F]{6,16}\b/);
  return m ? m[0] : null;
}

const WINDOWS_KNOWN = {
  "0x80070005":{
    en:"This code commonly means access was denied / a permissions problem. The exact fix depends on whether it appeared in Windows Update, Microsoft Store, Office activation, a file operation, or another app.",
    ru:"Этот код часто означает отказ в доступе или проблему с разрешениями. Точное решение зависит от того, где он появился: Windows Update, Microsoft Store, активация Office, работа с файлами или другая программа.",
    fi:"Tämä koodi tarkoittaa usein käyttöoikeus-/Access denied -ongelmaa. Tarkka ratkaisu riippuu siitä, näkyikö se Windows Updatessa, Microsoft Storessa, Officen aktivoinnissa, tiedostotoiminnossa vai muualla."
  }
};

function hexAnswer(code,l){
  const key=code.toLowerCase();
  const known=WINDOWS_KNOWN[key];

  if(known){
    return R(l,
      `${code}: ${known.en}\n\nWhere exactly did this code appear, and what were you trying to do? Please keep the full original error text if you can.`,
      `${code}: ${known.ru}\n\nГде именно появился этот код и что ты пытался сделать? Если можешь, пришли полный исходный текст ошибки без перевода.`,
      `${code}: ${known.fi}\n\nMissä tämä koodi näkyi ja mitä yritit tehdä? Lähetä mahdollisuuksien mukaan koko alkuperäinen virheteksti ilman käännöstä.`);
  }

  return R(l,
`I recognize ${code} as a hexadecimal technical error code, but the number alone is not enough to identify the cause reliably because the same-looking code can appear in different Windows components/apps.

Please send:
1. the full error message exactly as shown;
2. which app/Windows screen showed it;
3. what you clicked or tried immediately before it appeared.`,
`Я распознаю ${code} как шестнадцатеричный технический код ошибки, но одного номера недостаточно для надёжного диагноза: похожие коды встречаются в разных компонентах Windows и программах.

Пришли:
1. полный текст ошибки как он написан на экране;
2. где она появилась — какая программа/раздел Windows;
3. что ты нажал или пытался сделать прямо перед ошибкой.`,
`Tunnistan koodin ${code} heksadesimaaliseksi tekniseksi virhekoodiksi, mutta pelkkä numero ei riitä luotettavaan diagnoosiin, koska samanlaisia koodeja esiintyy eri Windows-osissa ja ohjelmissa.

Lähetä:
1. koko virheteksti täsmälleen kuten se näkyy;
2. missä ohjelmassa/Windows-näkymässä se näkyi;
3. mitä painoit tai yritit juuri ennen virhettä.`);
}

/* ---------- generic technical error recognition ---------- */

function genericErrorKind(text){
  const t=clean(text);

  if(/\b(something went wrong|something's gone wrong|something went wrong again)\b/i.test(t))
    return "something_wrong";
  if(/\b(internal error|internal server error)\b/i.test(t))
    return "internal";
  if(/\b(unexpected error|unexpected exception)\b/i.test(t))
    return "unexpected";
  if(/\b(access denied|permission denied|unauthorized)\b/i.test(t))
    return "permission";
  if(/\b(file not found|cannot find the file|the system cannot find the file)\b/i.test(t))
    return "file_not_found";
  if(/\b(out of memory|not enough memory|insufficient memory)\b/i.test(t))
    return "memory";
  if(/\b(no space left|not enough disk space|insufficient disk space|disk is full)\b/i.test(t))
    return "disk_full";
  if(/\b(connection failed|failed to connect|connection error)\b/i.test(t))
    return "connection";
  if(/\b(timeout|timed out|request timed out)\b/i.test(t))
    return "timeout";
  if(/\b(fatal error|fatal exception)\b/i.test(t))
    return "fatal";
  if(/\b(exception|traceback|stack trace)\b/i.test(t))
    return "exception";

  // Russian equivalents
  if(/что\s*то\s+пошло\s+не\s+так|что-то пошло не так/i.test(t)) return "something_wrong";
  if(/внутренняя ошибка/i.test(t)) return "internal";
  if(/непредвиденная ошибка|неожиданная ошибка/i.test(t)) return "unexpected";
  if(/доступ запрещен|доступ запрещён|нет прав|отказано в доступе/i.test(t)) return "permission";
  if(/файл не найден|не удается найти файл|не удаётся найти файл/i.test(t)) return "file_not_found";
  if(/недостаточно памяти|не хватает памяти/i.test(t)) return "memory";
  if(/недостаточно места|диск заполнен|нет места на диске/i.test(t)) return "disk_full";
  if(/не удалось подключиться|ошибка подключения/i.test(t)) return "connection";
  if(/тайм.?аут|время ожидания истекло/i.test(t)) return "timeout";

  return null;
}

function genericErrorAnswer(kind,l){
  const intros={
    something_wrong:R(l,
      "“Something went wrong” means the operation failed, but the message is too generic to reveal the cause by itself.",
      "«Something went wrong / Что-то пошло не так» означает, что операция не выполнилась, но сама эта фраза слишком общая и не показывает причину.",
      "“Something went wrong” tarkoittaa, että toiminto epäonnistui, mutta viesti yksin ei kerro tarkkaa syytä."),
    internal:R(l,
      "An internal error means the program/service failed inside its own processing. We need the app/site context to know whether the problem is local or server-side.",
      "Internal error означает внутренний сбой программы или сервиса. Нужно понять, где именно он появился, чтобы отделить проблему ПК от проблемы сервера/приложения.",
      "Internal error tarkoittaa ohjelman/palvelun sisäistä virhettä. Tarvitsemme sovelluksen/sivuston kontekstin erottaaksemme paikallisen ja palvelinpuolen ongelman."),
    unexpected:R(l,
      "An unexpected error means the program hit a condition it did not handle normally.",
      "Unexpected error означает, что программа столкнулась с ситуацией, которую не смогла нормально обработать.",
      "Unexpected error tarkoittaa, että ohjelma kohtasi tilanteen, jota se ei käsitellyt normaalisti."),
    permission:R(l,
      "This looks like a permissions/access problem.",
      "Похоже на проблему прав доступа.",
      "Tämä näyttää käyttöoikeusongelmalta."),
    file_not_found:R(l,
      "The program cannot find a file/path it expected.",
      "Программа не может найти ожидаемый файл или путь.",
      "Ohjelma ei löydä odottamaansa tiedostoa tai polkua."),
    memory:R(l,
      "The program/system says there is not enough usable memory. This can mean high RAM use, an app limit, or sometimes virtual-memory/page-file pressure.",
      "Система/программа сообщает о нехватке доступной памяти. Причиной может быть высокая загрузка RAM, ограничение программы или давление на виртуальную память/page file.",
      "Järjestelmä/ohjelma ilmoittaa, ettei käytettävissä ole tarpeeksi muistia. Syynä voi olla korkea RAM-käyttö, ohjelman rajoitus tai virtuaalimuistin paine."),
    disk_full:R(l,
      "The system does not have enough free storage for the requested operation.",
      "Для операции не хватает свободного места на накопителе.",
      "Tallennustilaa ei ole tarpeeksi pyydettyyn toimintoon."),
    connection:R(l,
      "The app could not establish a connection.",
      "Программа не смогла установить соединение.",
      "Ohjelma ei pystynyt muodostamaan yhteyttä."),
    timeout:R(l,
      "The operation waited too long for a response and timed out.",
      "Операция слишком долго ждала ответ и завершилась по тайм-ауту.",
      "Toiminto odotti vastausta liian kauan ja aikakatkaistiin."),
    fatal:R(l,
      "A fatal error means the program decided it could not continue safely.",
      "Fatal error означает, что программа решила, что не может безопасно продолжить работу.",
      "Fatal error tarkoittaa, että ohjelma ei voinut jatkaa turvallisesti."),
    exception:R(l,
      "This is a software exception/error report. The first error line, exception type/code and the app name are the most useful parts for diagnosis.",
      "Это отчёт об исключении/ошибке программы. Для диагностики особенно полезны первая строка ошибки, тип/код исключения и название программы.",
      "Tämä on ohjelmiston poikkeus-/virheraportti. Ensimmäinen virherivi, poikkeuksen tyyppi/koodi ja ohjelman nimi ovat tärkeimmät tiedot.")
  };

  return `${intros[kind]||intros.unexpected}\n\n` + R(l,
    "Tell me where you saw it (website/app/Windows), what you were trying to do, and paste the full error text/code if there is one. You do not need to translate an English error — send it exactly as shown.",
    "Напиши, где это появилось (сайт/программа/Windows), что ты пытался сделать, и пришли полный текст/код ошибки, если он есть. Английскую ошибку переводить не нужно — отправляй её точно как на экране.",
    "Kerro missä se näkyi (sivusto/ohjelma/Windows), mitä yritit tehdä, ja lähetä koko virheteksti/koodi jos sellainen on. Englanninkielistä virhettä ei tarvitse kääntää — lähetä se täsmälleen sellaisena kuin se näkyy."
  );
}

function looksLikePastedTechnicalError(text){
  const t=String(text||"").trim();
  if(!t) return false;

  return (
    /\b(error|failed|failure|exception|fatal|warning|denied|not found|cannot|can't|unable|invalid|timeout|timed out)\b/i.test(t) ||
    /\bERR_[A-Z0-9_]+\b/.test(t) ||
    /\bDNS_[A-Z0-9_]+\b/.test(t) ||
    /\b0x[0-9a-fA-F]{6,16}\b/.test(t) ||
    /\b[A-Z][A-Z0-9]+(?:_[A-Z0-9]+){2,}\b/.test(t) ||
    /(?:[A-Za-z]:\\|\/usr\/|\/home\/|\/var\/|\/etc\/)/.test(t) ||
    /\b\d{3}\b/.test(t) && /\b(error|http|server|page)\b/i.test(t)
  );
}

function unknownTechnicalAnswer(text,l){
  // Store raw technical evidence without forcing a translation.
  S.lastTechnicalEvidence=String(text||"").slice(0,2000);
  S.lastQuestion="technical_error_context";

  return R(l,
`I can see this is technical error information, so I won't treat it as ordinary conversation even if I don't have that exact message in my built-in list.

Please tell me:
1. which program, game, website or Windows screen showed it;
2. what you were trying to do immediately before it appeared;
3. whether it happens every time or only sometimes.

Keep the original error text/code exactly as shown — don't translate it.`,
`Я вижу, что это техническая ошибка, поэтому не буду воспринимать её как обычную неизвестную фразу, даже если точного текста нет в моей встроенной базе.

Напиши:
1. какая программа, игра, сайт или раздел Windows показали ошибку;
2. что ты пытался сделать прямо перед её появлением;
3. появляется ли она каждый раз или только иногда.

Исходный текст/код ошибки оставляй как есть — переводить его не нужно.`,
`Näen, että tämä on teknistä virhetietoa, joten en käsittele sitä tavallisena tuntemattomana lauseena, vaikka tarkkaa viestiä ei olisi sisäisessä tietokannassani.

Kerro:
1. mikä ohjelma, peli, sivusto tai Windows-näkymä näytti virheen;
2. mitä yritit tehdä juuri ennen sitä;
3. tapahtuuko se joka kerta vai vain joskus.

Pidä alkuperäinen virheteksti/koodi sellaisenaan — sitä ei tarvitse kääntää.`);
}

/* ---------- disk space / Optimize Drives knowledge ---------- */

function diskIntent(text){
  const n=normalizeSlang(text);
  const t=clean(n);

  const disk=/\b(disk|drive|storage|space|hdd|ssd|диск|место|накопител|levy|tila|tallennus)\b/i.test(t);
  if(!disk) return null;

  const free=/\b(free|increase|more|make space|clear space|low space|full|освобод|увелич|больше места|заканчивается место|заполнен|vapauta|lisää tilaa|tila loppu)\b/i.test(t);
  const defrag=/\b(defrag|defragment|defragmentation|optimize drive|дефраг|дефрагмент|оптимизац|eheytä|optimoi levy)\b/i.test(t);
  const speed=/\b(speed|faster|slow|performance|ускор|быстр|медлен|nopeut|hidas|suorituskyky)\b/i.test(t);

  if(defrag) return "defrag";
  if(free) return "free_space";
  if(speed && /\bhdd\b/i.test(t)) return "hdd_speed";
  return null;
}

function diskAnswer(intent,l){
  if(intent==="free_space"){
    S.rootProblem="disk_space";
    S.issue="disk_space";
    S.lastQuestion="disk_cleanup_result";

    return R(l,
`If your goal is to get MORE FREE SPACE, defragmentation is not the right tool — it reorganizes/optimizes data but does not meaningfully increase free capacity.

Try this in Windows:
1. Start → Settings → System → Storage.
2. Open “Cleanup recommendations” or “Temporary files”.
3. Review what Windows suggests before deleting anything.
4. You can turn on Storage Sense to automatically remove unnecessary temporary files.
5. Check large/unused files and uninstall apps you no longer need.

If you tell me how much free space is left on C: and its total size, I can help decide what to clean safely.`,
`Если цель — получить БОЛЬШЕ СВОБОДНОГО МЕСТА, дефрагментация не подходит: она реорганизует/оптимизирует данные, но практически не увеличивает свободный объём.

В Windows сделай так:
1. Пуск → Параметры → Система → Память.
2. Открой «Рекомендации по очистке» или «Временные файлы».
3. Перед удалением просмотри, что предлагает Windows.
4. Можно включить «Контроль памяти / Storage Sense» для автоматической очистки ненужных временных файлов.
5. Проверь большие/неиспользуемые файлы и удали программы, которыми не пользуешься.

Напиши, сколько свободно на диске C: и какой у него общий объём — я помогу понять, что безопаснее чистить.`,
`Jos tavoite on saada LISÄÄ VAPAATA TILAA, eheyttäminen ei ole oikea työkalu: se järjestää/optimoi dataa, mutta ei käytännössä lisää vapaata kapasiteettia.

Windowsissa:
1. Käynnistä → Asetukset → Järjestelmä → Tallennustila.
2. Avaa Cleanup recommendations tai Temporary files.
3. Tarkista ehdotukset ennen poistamista.
4. Voit ottaa Storage Sensen käyttöön turhien väliaikaistiedostojen automaattiseen poistoon.
5. Tarkista suuret/käyttämättömät tiedostot ja poista tarpeettomat sovellukset.

Kerro paljonko C:-asemalla on vapaata ja sen kokonaiskoko, niin autan valitsemaan turvallisen siivouksen.`);
  }

  // defrag / HDD performance
  S.rootProblem="drive_optimization";
  S.issue="drive_optimization";
  S.lastQuestion="drive_type";

  return R(l,
`If your goal is performance rather than free space, Windows has “Defragment and Optimize Drives”.

Open it:
1. Press Start/Search.
2. Type “defrag”.
3. Open “Defragment and Optimize Drives”.
4. Select the drive.
5. For a hard disk drive (HDD), you can Analyze and then Optimize if needed.

For an SSD, don't repeatedly force traditional defragmentation. Windows' Optimize Drives handles SSDs differently (including TRIM/optimization), and Windows normally optimizes drives automatically.

If you don't know whether C: is HDD or SSD, tell me and I'll show you how to check.`,
`Если цель — ускорить работу, а не освободить место, в Windows есть «Дефрагментация и оптимизация дисков».

Как открыть:
1. Нажми Пуск/Поиск.
2. Напиши «дефрагментация» или "defrag".
3. Открой «Дефрагментация и оптимизация дисков».
4. Выбери нужный диск.
5. Если это HDD, можно нажать «Анализировать», а затем «Оптимизировать», если требуется.

Для SSD не нужно постоянно запускать обычную ручную дефрагментацию. Windows обрабатывает SSD в «Оптимизации дисков» иначе (в том числе выполняет TRIM/оптимизацию), и обычно сама оптимизирует накопители автоматически.

Если не знаешь, C: — HDD или SSD, напиши — покажу, где это посмотреть.`,
`Jos tavoite on suorituskyky eikä vapaa tila, Windowsissa on “Defragment and Optimize Drives”.

Avaa se:
1. Paina Käynnistä/Haku.
2. Kirjoita “defrag”.
3. Avaa “Defragment and Optimize Drives”.
4. Valitse asema.
5. HDD-levylle voit käyttää Analyze- ja tarvittaessa Optimize-toimintoa.

SSD:tä ei pidä jatkuvasti pakottaa perinteiseen eheyttämiseen. Windows käsittelee SSD:t Optimize Drives -toiminnossa eri tavalla (mm. TRIM/optimointi), ja Windows optimoi asemia normaalisti automaattisesti.

Jos et tiedä onko C: HDD vai SSD, kerro niin näytän miten se tarkistetaan.`);
}

/* ---------- route order ---------- */

V.handle=function(text,l){
  const language=selectedLang(text);
  const raw=String(text||"");

  // Keep language state stable for mixed-language pasted errors.
  if(S.language && ["ru","en","fi"].includes(String(S.language).toLowerCase())){
    // preserve existing
  } else {
    S.language=language;
  }

  // 1) Disk-space / optimization intent is a user question, so handle before
  // generic code/error parsing.
  const di=diskIntent(raw);
  if(di){
    return {type:"answer",text:diskAnswer(di,language)};
  }

  // 2) Specific HTTP codes.
  const http=findHttp(raw);
  if(http){
    S.lastTechnicalEvidence=raw.slice(0,2000);
    S.lastQuestion="http_error_context";
    return {type:"answer",text:httpAdvice(http,language)};
  }

  // 3) Specific browser/network error names.
  const be=findBrowserError(raw);
  if(be){
    S.lastTechnicalEvidence=raw.slice(0,2000);
    S.lastQuestion="browser_error_context";
    return {type:"answer",text:browserAdvice(be,language)};
  }

  // 4) BSOD/STOP code.
  const sc=findStopCode(raw);
  if(sc){
    S.rootProblem="windows_stop_error";
    S.issue="windows_stop_error";
    S.lastTechnicalEvidence=raw.slice(0,2000);
    S.lastQuestion="stop_code_followup";
    return {type:"answer",text:bsodAnswer(sc,language)};
  }

  // 5) Hex Windows/app error code.
  const hex=findHexError(raw);
  if(hex){
    S.lastTechnicalEvidence=raw.slice(0,2000);
    S.lastQuestion="hex_error_context";
    return {type:"answer",text:hexAnswer(hex,language)};
  }

  // 6) Generic "something went wrong" etc.
  const ge=genericErrorKind(raw);
  if(ge){
    S.lastTechnicalEvidence=raw.slice(0,2000);
    S.lastQuestion="generic_error_context";
    return {type:"answer",text:genericErrorAnswer(ge,language)};
  }

  // 7) Slang-normalized version gets one chance through the existing engine.
  // This teaches the old intent system many natural RU/EN forms without
  // duplicating all old troubleshooting branches.
  const normalized=normalizeSlang(raw);
  if(normalized && normalized!==raw && normalized.toLowerCase()!==raw.toLowerCase()){
    const result=old(normalized,l);
    if(result && typeof result.text==="string"){
      const low=result.text.toLowerCase();
      const fallback =
        low.includes("я пока не до конца поняла") ||
        low.includes("i'm not fully sure what you mean") ||
        low.includes("i am not fully sure what you mean") ||
        low.includes("en ole vielä täysin varma");
      if(!fallback) return result;
    }
  }

  // 8) Unknown pasted technical error: targeted clarification, never ordinary fallback.
  if(looksLikePastedTechnicalError(raw)){
    return {type:"answer",text:unknownTechnicalAnswer(raw,language)};
  }

  return old(text,l);
};

window.ANITA_V15={
  version:"15.0",
  normalizeSlang,
  findHttp,
  findBrowserError,
  findStopCode,
  findHexError,
  genericErrorKind,
  diskIntent,
  looksLikePastedTechnicalError
};

console.log("[ANITA v15] Knowledge + Error Understanding Core loaded");
})();

/* ================= ANITA v15.1 VAGUE PROBLEM ROUTER HOTFIX =================
   Important routing fix.

   v15 slang normalization can turn:
       "Проблема с компом"
   into:
       "Проблема с computer"
   before an older Russian-only vague-problem detector sees it.

   This hotfix runs BEFORE the v15 handler and catches vague problem reports
   from the ORIGINAL raw text, including Russian case endings/slang.

   Also handles a bare "Проблема" by asking which device/program is affected.
   =========================================================================== */
(function(){
"use strict";

if(!window.ANITA_V12 || typeof window.ANITA_V12.handle!=="function") return;

const V = window.ANITA_V12;
const old = V.handle.bind(V);
const S = V.state;

function clean(s){
  return String(s||"")
    .toLowerCase()
    .replace(/ё/g,"е")
    .replace(/[?!.,:;()[\]{}"“”]/g," ")
    .replace(/\s+/g," ")
    .trim();
}

function currentLang(text){
  const vals=[
    S.manualLanguage,S.selectedLanguage,S.language,S.lang,
    window.ANITA_LANGUAGE,window.anitaLanguage
  ];
  for(const x of vals){
    const v=String(x||"").toLowerCase();
    if(v==="ru"||v.startsWith("ru")) return "ru";
    if(v==="en"||v.startsWith("en")) return "en";
    if(v==="fi"||v.startsWith("fi")) return "fi";
  }
  if(/[а-яё]/i.test(text||"")) return "ru";
  if(/[äöå]/i.test(text||"")) return "fi";
  return "en";
}

function hasRuComputer(text){
  const t=clean(text);
  // Match full Russian stems with ANY normal case ending:
  // комп, компа, компу, компом, компе, компы...
  // компьютер, компьютера, компьютером...
  // ноут, ноута, ноутом...
  return /(?:^|\s)(?:комп(?:ьютер)?[а-я]*|компик[а-я]*|пк|ноут(?:бук)?[а-я]*)(?=\s|$)/i.test(t);
}

function hasEnComputer(text){
  return /\b(?:pc|computer|desktop|machine|rig|laptop|notebook|lappy)\b/i.test(clean(text));
}

function hasProblemWord(text){
  const t=clean(text);
  return (
    /(?:^|\s)проблем[а-я]*(?=\s|$)/i.test(t) ||
    /(?:^|\s)неполад[а-я]*(?=\s|$)/i.test(t) ||
    /что\s*то\s+не\s+так/i.test(t) ||
    /(?:^|\s)(?:problem|issue|trouble)(?=\s|$)/i.test(t) ||
    /something\s+(?:is\s+)?wrong/i.test(t) ||
    /(?:^|\s)(?:ongelma|vika)(?=\s|$)/i.test(t)
  );
}

function hasConcreteSymptom(text){
  const t=clean(text);
  return (
    /тормоз|медлен|лага|зависа|фриз|вылета|краш|не\s+включ|не\s+запуска|перезагружа|выключа|нет\s+изображ|черн[а-я]*\s+экран|нет\s+интернет|пропал[а-я]*\s+интернет|перегрева|греет|шумит|син[а-я]*\s+экран|ошибк/i.test(t) ||
    /\b(?:slow|sluggish|laggy|lagging|freeze|freezing|frozen|crash|crashing|won't turn on|wont turn on|won't start|wont start|reboot|restarting|shuts down|black screen|no display|no internet|overheat|overheating|blue screen|error)\b/i.test(t) ||
    /\b(?:hidas|lagaa|jäätyy|kaatuu|ei käynnisty|sammuu|musta näyttö|ei kuvaa|ei nettiä|ylikuumenee|virhe)\b/i.test(t)
  );
}

function isBareProblem(text){
  const t=clean(text);
  return /^(?:проблема|проблемы|problem|issue|ongelma|vika)$/.test(t);
}

function askComputer(lang){
  S.awaitingGenericSymptom=true;
  S.genericProblemDevice="computer";
  S.lastQuestion="generic_symptom";
  S.lastInstruction="describe_symptom";

  let msg;
  if(lang==="ru"){
    msg=`Поняла — проблема с компьютером.

Что именно происходит?
Например: он медленно работает, зависает, не включается, перезагружается, нет изображения, пропадает интернет или появляется ошибка?

Опиши своими словами — можно использовать сленг и можно вставить текст ошибки как есть.`;
  } else if(lang==="fi"){
    msg=`Selvä — tietokoneessa on ongelma.

Mitä tarkalleen tapahtuu?
Onko se hidas, jäätyykö se, eikö se käynnisty, käynnistyykö uudelleen, puuttuuko kuva, katkeaako Internet vai näkyykö virheilmoitus?

Voit kuvailla omin sanoin ja liittää virheilmoituksen sellaisenaan.`;
  } else {
    msg=`Got it — there's a problem with the computer.

What exactly is happening?
Is it slow, freezing, not turning on, restarting, showing no picture, losing Internet, or showing an error?

Describe it in your own words; slang is fine, and you can paste the original error text as-is.`;
  }

  S.lastAnswer=msg;
  return {type:"answer",text:msg};
}

function askObject(lang){
  S.lastQuestion="generic_problem_object";

  let msg;
  if(lang==="ru"){
    msg=`Поняла. С чем именно проблема — с компьютером, монитором, интернетом, принтером, браузером или программой?

Можешь написать просто, например: «с компом», «интернет пропадает» или вставить текст ошибки.`;
  } else if(lang==="fi"){
    msg=`Selvä. Missä ongelma on — tietokoneessa, näytössä, Internetissä, tulostimessa, selaimessa vai ohjelmassa?

Voit vastata omin sanoin tai liittää virhetekstin.`;
  } else {
    msg=`Got it. What has the problem — the computer, monitor, Internet, printer, browser, or an app?

You can answer naturally, for example “my PC”, “Internet keeps dropping”, or paste the error text.`;
  }

  S.lastAnswer=msg;
  return {type:"answer",text:msg};
}

V.handle=function(text,l){
  const raw=String(text||"");
  const lang=currentLang(raw);

  // Catch the original phrase BEFORE v15 slang normalization.
  if(hasProblemWord(raw) && (hasRuComputer(raw)||hasEnComputer(raw)) && !hasConcreteSymptom(raw)){
    return askComputer(lang);
  }

  // "Проблема" alone is still meaningful: ask what is affected.
  if(isBareProblem(raw)){
    return askObject(lang);
  }

  return old(text,l);
};

window.ANITA_V15_1={
  version:"15.1",
  hasRuComputer,
  hasEnComputer,
  hasProblemWord,
  hasConcreteSymptom,
  isBareProblem
};

console.log("[ANITA v15.1] Vague Problem Router Hotfix loaded");
})();

/* ================= ANITA v16 VOICE INPUT CORE =================
   Browser-side speech-to-text for RU / EN / FI.

   UX:
   - Adds microphone button next to the existing Send button.
   - Uses selected ANITA language:
       RU -> ru-RU
       EN -> en-US
       FI -> fi-FI
   - In AUTO mode, uses current conversation language where possible.
   - Recognized speech appears in the normal text input FIRST.
     User can edit it before pressing Send.
   - Poor/uncertain recognition is NOT sent to troubleshooting.
     ANITA politely asks the user to repeat more clearly.
   - Handles silence / no-speech / permission errors.
   - Does not require GitHub server-side processing.
   ================================================================= */
(function(){
"use strict";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const inputEl =
  (typeof input !== "undefined" && input) ||
  document.querySelector("#input");

const formEl =
  (typeof form !== "undefined" && form) ||
  document.querySelector("#form");

const sendEl =
  (typeof send !== "undefined" && send) ||
  document.querySelector("#send");

const chatEl =
  (typeof chat !== "undefined" && chat) ||
  document.querySelector("#chat");

if(!inputEl || !formEl || !sendEl){
  console.warn("[ANITA v16] Voice UI not mounted: input/form/send not found.");
  return;
}

function getUiLanguage(){
  // Read ANITA's existing language variables if available.
  try{
    if(typeof languageMode !== "undefined" && languageMode && languageMode !== "auto"){
      if(["ru","en","fi"].includes(languageMode)) return languageMode;
    }
  }catch(_){}

  try{
    if(typeof currentLanguage !== "undefined" && ["ru","en","fi"].includes(currentLanguage)){
      return currentLanguage;
    }
  }catch(_){}

  const htmlLang=(document.documentElement.lang||"").toLowerCase();
  if(htmlLang.startsWith("ru")) return "ru";
  if(htmlLang.startsWith("fi")) return "fi";
  return "en";
}

function speechLocale(){
  const l=getUiLanguage();
  return l==="ru" ? "ru-RU" : l==="fi" ? "fi-FI" : "en-US";
}

function T(l,en,ru,fi){
  return l==="ru" ? ru : l==="fi" ? fi : en;
}

function botMessage(text){
  try{
    if(typeof addMessage === "function"){
      addMessage(text,"bot");
      return;
    }
  }catch(_){}

  if(chatEl){
    const d=document.createElement("div");
    d.className="msg bot";
    d.textContent=text;
    chatEl.appendChild(d);
    chatEl.scrollTop=chatEl.scrollHeight;
  }
}

function voiceStatus(text){
  statusEl.textContent=text||"";
  statusEl.style.display=text ? "block" : "none";
}

function looksBadTranscript(text, confidence){
  const s=String(text||"").trim();
  if(!s) return true;

  // A very low browser confidence is strong evidence that the microphone
  // did not hear the user clearly. Some engines return 0 even for useful
  // speech, therefore confidence is only one signal.
  if(typeof confidence==="number" && confidence>0 && confidence<0.32) return true;

  const compact=s.replace(/\s+/g,"");
  const words=s.split(/\s+/).filter(Boolean);

  // Only punctuation/digits or nearly no letters.
  const letters=(s.match(/[A-Za-zА-Яа-яЁёÄÖÅäöå]/g)||[]).length;
  const digits=(s.match(/\d/g)||[]).length;
  if(letters===0) return true;
  if(digits>=4 && letters<=2) return true;

  // Extremely short interjections/noise are not useful IT requests.
  const noise=/^(?:э+|эм+|мм+|м+|ээ+|uh+|um+|hmm+|hm+|ah+|oh+|öö+|hmm)$/i;
  if(noise.test(s)) return true;

  // Long single "word" with little vowel structure often indicates
  // corrupted speech recognition.
  if(words.length===1 && compact.length>=10){
    const vowels=(compact.match(/[aeiouyаеёиоуыэюяäöå]/gi)||[]).length;
    if(vowels/compact.length < 0.12) return true;
  }

  // Repeated symbol-like fragments.
  if(/^(?:[a-zа-я]\s*){1,3}\d{3,}$/i.test(s)) return true;

  return false;
}

function repeatPrompt(reason){
  const l=getUiLanguage();

  if(reason==="no-speech"){
    return T(l,
      "I didn't hear enough speech. Please tap the microphone and say the sentence again a little closer to the microphone.",
      "Я почти не услышала речь. Нажми на микрофон ещё раз и повтори фразу немного ближе к микрофону.",
      "En kuullut puhetta riittävästi. Paina mikrofonia uudelleen ja toista lause hieman lähempänä mikrofonia.");
  }

  return T(l,
    "It looks like the speech wasn't recognized clearly. Please tap the microphone and repeat the phrase a little more clearly or closer to the microphone.",
    "Похоже, речь распозналась нечётко. Нажми на микрофон ещё раз и повтори фразу чуть яснее или ближе к микрофону.",
    "Puhe ei näyttänyt tunnistuvan selkeästi. Paina mikrofonia uudelleen ja toista lause hieman selvemmin tai lähempänä mikrofonia.");
}

function permissionPrompt(){
  const l=getUiLanguage();
  return T(l,
    "I can't access the microphone. Allow microphone access for this site in the browser settings, then try again. You can still type your message normally.",
    "Я не могу получить доступ к микрофону. Разреши этому сайту доступ к микрофону в настройках браузера и попробуй снова. Текстовый ввод продолжает работать как обычно.",
    "En pääse käyttämään mikrofonia. Salli mikrofonin käyttö tälle sivustolle selaimen asetuksissa ja yritä uudelleen. Voit edelleen kirjoittaa viestin normaalisti.");
}

function unsupportedPrompt(){
  const l=getUiLanguage();
  return T(l,
    "Voice input isn't supported by this browser. You can still type your message normally.",
    "Этот браузер не поддерживает голосовой ввод ANITA. Сообщение всё равно можно написать вручную.",
    "Tämä selain ei tue ANITAn äänisyöttöä. Voit silti kirjoittaa viestin normaalisti.");
}

/* ---------- UI ---------- */

const style=document.createElement("style");
style.id="anitaVoiceStyle";
style.textContent=`
  #anitaVoiceWrap{
    display:flex;
    align-items:center;
    gap:8px;
  }
  #anitaMic{
    width:44px;
    height:44px;
    min-width:44px;
    border:1px solid rgba(255,255,255,.18);
    border-radius:12px;
    background:#171717;
    color:#ff7a00;
    cursor:pointer;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    font-size:21px;
    line-height:1;
    transition:transform .15s ease, background .15s ease, box-shadow .15s ease;
  }
  #anitaMic:hover{ transform:translateY(-1px); }
  #anitaMic.listening{
    background:#ff7a00;
    color:#111;
    box-shadow:0 0 0 4px rgba(255,122,0,.18);
    animation:anitaMicPulse 1.15s infinite;
  }
  #anitaMic:disabled{
    opacity:.45;
    cursor:not-allowed;
    animation:none;
  }
  #anitaVoiceStatus{
    display:none;
    margin-top:6px;
    font-size:12px;
    opacity:.72;
    line-height:1.3;
  }
  @keyframes anitaMicPulse{
    0%{box-shadow:0 0 0 0 rgba(255,122,0,.30)}
    70%{box-shadow:0 0 0 8px rgba(255,122,0,0)}
    100%{box-shadow:0 0 0 0 rgba(255,122,0,0)}
  }
`;
if(!document.getElementById(style.id)) document.head.appendChild(style);

const mic=document.createElement("button");
mic.type="button";
mic.id="anitaMic";
mic.setAttribute("aria-label","Voice input");
mic.setAttribute("title","Voice input");
mic.textContent="🎙️";

const statusEl=document.createElement("div");
statusEl.id="anitaVoiceStatus";

// Put mic immediately before existing Send button where possible.
sendEl.parentNode.insertBefore(mic,sendEl);
const parent=sendEl.parentElement;
if(parent && !document.getElementById("anitaVoiceStatus")){
  parent.insertAdjacentElement("afterend",statusEl);
}

/* ---------- recognition ---------- */

let recognition=null;
let listening=false;
let gotResult=false;

function setListening(v){
  listening=!!v;
  mic.classList.toggle("listening",listening);
  mic.setAttribute("aria-pressed",listening ? "true":"false");
  const l=getUiLanguage();
  mic.title=listening
    ? T(l,"Listening… tap to stop","Слушаю… нажми, чтобы остановить","Kuuntelen… paina lopettaaksesi")
    : T(l,"Voice input","Голосовой ввод","Äänisyöttö");
  voiceStatus(listening
    ? T(l,"Listening…","Слушаю…","Kuuntelen…")
    : "");
}

function buildRecognition(){
  if(!SpeechRecognition) return null;

  const r=new SpeechRecognition();
  r.continuous=false;
  r.interimResults=true;
  r.maxAlternatives=3;

  r.onstart=()=>{
    gotResult=false;
    setListening(true);
  };

  r.onspeechstart=()=>{
    const l=getUiLanguage();
    voiceStatus(T(l,"I can hear you…","Я слышу тебя…","Kuulen sinut…"));
  };

  r.onresult=(event)=>{
    let interim="";
    let finalText="";
    let confidence=0;

    for(let i=event.resultIndex;i<event.results.length;i++){
      const result=event.results[i];
      const alt=result[0];
      if(result.isFinal){
        finalText += (finalText?" ":"") + alt.transcript.trim();
        confidence=Math.max(confidence,Number(alt.confidence)||0);
      }else{
        interim += (interim?" ":"") + alt.transcript.trim();
      }
    }

    const preview=(finalText||interim).trim();
    if(preview){
      inputEl.value=preview;
      inputEl.dispatchEvent(new Event("input",{bubbles:true}));
    }

    if(finalText){
      gotResult=true;

      if(looksBadTranscript(finalText,confidence)){
        inputEl.value="";
        inputEl.dispatchEvent(new Event("input",{bubbles:true}));
        botMessage(repeatPrompt("unclear"));
        return;
      }

      inputEl.value=finalText.trim();
      inputEl.dispatchEvent(new Event("input",{bubbles:true}));
      inputEl.focus();

      const l=getUiLanguage();
      voiceStatus(T(l,
        "Speech converted to text — edit it if needed, then press Send.",
        "Речь преобразована в текст — при необходимости исправь её и нажми «Отправить».",
        "Puhe muutettiin tekstiksi — korjaa tarvittaessa ja paina Lähetä."));
    }
  };

  r.onerror=(event)=>{
    setListening(false);
    const err=event && event.error ? event.error : "unknown";

    if(err==="not-allowed" || err==="service-not-allowed"){
      botMessage(permissionPrompt());
      return;
    }

    if(err==="no-speech"){
      inputEl.value="";
      botMessage(repeatPrompt("no-speech"));
      return;
    }

    if(err==="audio-capture"){
      const l=getUiLanguage();
      botMessage(T(l,
        "I couldn't access a working microphone. Check that the microphone is connected/enabled and try again.",
        "Не удалось получить звук с микрофона. Проверь, что микрофон подключён и включён, затем попробуй ещё раз.",
        "En saanut ääntä mikrofonista. Tarkista, että mikrofoni on kytketty ja käytössä, ja yritä uudelleen."));
      return;
    }

    if(err!=="aborted"){
      botMessage(repeatPrompt("unclear"));
    }
  };

  r.onend=()=>{
    setListening(false);
    if(!gotResult && !inputEl.value.trim()){
      // onerror normally handles real no-speech. This catches engines that end
      // silently without returning a result.
      const l=getUiLanguage();
      voiceStatus(T(l,
        "No speech recognized. Tap the microphone to try again.",
        "Речь не распознана. Нажми на микрофон, чтобы попробовать ещё раз.",
        "Puhetta ei tunnistettu. Paina mikrofonia ja yritä uudelleen."));
    }
  };

  return r;
}

if(!SpeechRecognition){
  mic.disabled=true;
  mic.title="Voice input not supported";
  mic.addEventListener("click",()=>botMessage(unsupportedPrompt()));
}else{
  mic.addEventListener("click",()=>{
    if(listening && recognition){
      recognition.stop();
      return;
    }

    recognition=buildRecognition();
    if(!recognition){
      botMessage(unsupportedPrompt());
      return;
    }

    recognition.lang=speechLocale();

    // Clear stale "listening" status, but do NOT destroy the user's typed text
    // until actual speech results begin.
    gotResult=false;

    try{
      recognition.start();
    }catch(err){
      console.warn("[ANITA v16] SpeechRecognition.start failed",err);
      setListening(false);
      botMessage(repeatPrompt("unclear"));
    }
  });
}

/* ---------- keep mic language/title synchronized ---------- */

document.querySelectorAll(".langBtn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    setTimeout(()=>{
      const l=getUiLanguage();
      mic.setAttribute(
        "aria-label",
        T(l,"Voice input","Голосовой ввод","Äänisyöttö")
      );
      mic.title=T(l,"Voice input","Голосовой ввод","Äänisyöttö");
    },0);
  });
});

/* ---------- public helper ---------- */

window.ANITA_VOICE={
  version:"16.0",
  supported:!!SpeechRecognition,
  start:function(){ mic.click(); },
  stop:function(){ if(recognition && listening) recognition.stop(); },
  locale:speechLocale,
  getLanguage:getUiLanguage,
  looksBadTranscript
};

console.log("[ANITA v16] Voice Input Core loaded",{
  supported:!!SpeechRecognition,
  locale:speechLocale()
});
})();

/* ================= ANITA v16.1 AUTO LANGUAGE PRIORITY FIX =================
   In AUTO mode, detect language from the CURRENT USER MESSAGE before using
   remembered/default English. Manual RU/EN/FI selection still has priority.
   ======================================================================== */
(function(){
"use strict";
if(!window.ANITA_V12 || typeof window.ANITA_V12.handle!=="function") return;

const V=window.ANITA_V12;
const old=V.handle.bind(V);
const S=V.state;

function manualLang(){
  try{
    if(typeof languageMode!=="undefined"){
      const m=String(languageMode||"").toLowerCase();
      if(["ru","en","fi"].includes(m)) return m;
      if(m==="auto") return null;
    }
  }catch(_){}
  const m=String(S.manualLanguage||S.selectedLanguage||"").toLowerCase();
  return ["ru","en","fi"].includes(m) ? m : null;
}

function detectMessageLang(text){
  const s=String(text||"");
  if(/[а-яё]/i.test(s)) return "ru";
  if(/[äöå]/i.test(s) || /\b(?:minulla|tietokone|ongelma|miksi|miten|ei|toimi|hidas)\b/i.test(s)) return "fi";
  if(/[a-z]/i.test(s)) return "en";
  return null;
}

V.handle=function(text,l){
  const forced=manualLang();
  const detected=detectMessageLang(text);
  const effective=forced || detected || l || S.language || "en";

  // In AUTO, the current message wins over stale/default state.
  if(!forced && detected) S.language=detected;
  if(forced) S.language=forced;

  return old(text,effective);
};

window.ANITA_V16_1={
  version:"16.1",
  detectMessageLang,
  manualLang
};

console.log("[ANITA v16.1] AUTO language priority fix loaded");
})();

/* ================= ANITA v16.2 STRICT RAM VS PROGRAM FIX =================
   Fixes a fundamental substring bug:
     "program" contains the letters "ram"
   so weak legacy matching could incorrectly route "program" -> RAM.

   New rule:
   - RAM must be a real token/known synonym, never a substring inside another word.
   - program / programs / programme / app / application / software are SOFTWARE.
   - Russian программа / приложение / софт are SOFTWARE.
   - Finnish ohjelma / sovellus are SOFTWARE.
   - If user only says "program", ANITA asks what is wrong with the program.
   ======================================================================== */
(function(){
"use strict";

if(!window.ANITA_V12 || typeof window.ANITA_V12.handle!=="function") return;

const V = window.ANITA_V12;
const old = V.handle.bind(V);
const S = V.state;

function clean(s){
  return String(s||"")
    .toLowerCase()
    .replace(/ё/g,"е")
    .replace(/[?!.,:;()[\]{}"“”]/g," ")
    .replace(/\s+/g," ")
    .trim();
}

function lang(text){
  const stateLang=String(S.language||"").toLowerCase();
  if(stateLang==="ru"||stateLang==="en"||stateLang==="fi") return stateLang;
  if(/[а-яё]/i.test(text||"")) return "ru";
  if(/[äöå]/i.test(text||"")) return "fi";
  return "en";
}

function isRamToken(text){
  const t=clean(text);

  // True RAM words/synonyms only.
  return (
    /(?:^|\s)(?:ram|memory|mem)(?=\s|$)/i.test(t) ||
    /(?:^|\s)(?:озу|оперативка|оперативная\s+память)(?=\s|$)/i.test(t) ||
    /(?:^|\s)(?:keskusmuisti|ram-muisti|muisti)(?=\s|$)/i.test(t)
  );
}

function isSoftwareToken(text){
  const t=clean(text);

  return (
    /(?:^|\s)(?:program|programs|programme|programmes|app|apps|application|applications|software)(?=\s|$)/i.test(t) ||
    /(?:^|\s)(?:программа|программы|программу|программой|приложение|приложения|приложению|софт)(?=\s|$)/i.test(t) ||
    /(?:^|\s)(?:ohjelma|ohjelmat|sovellus|sovellukset)(?=\s|$)/i.test(t)
  );
}

function onlySoftwareWord(text){
  const t=clean(text);
  return /^(?:program|programs|programme|app|application|software|программа|программы|приложение|софт|ohjelma|sovellus)$/.test(t);
}

function softwareAnswer(l){
  S.rootProblem="software_problem";
  S.issue="software_problem";
  S.currentSymptom=null;
  S.lastQuestion="software_symptom";

  if(l==="ru"){
    return `Поняла — речь о программе, а не о RAM.

Что именно происходит с программой?
Например: она не запускается, зависает, закрывается сама, работает медленно, показывает ошибку или что-то другое?

Если есть текст ошибки — можешь вставить его как есть.`;
  }

  if(l==="fi"){
    return `Selvä — tarkoitat ohjelmaa, et RAM-muistia.

Mitä ohjelmalle tarkalleen tapahtuu?
Esimerkiksi: eikö se käynnisty, jäätyykö se, sulkeutuuko itsestään, onko se hidas vai näyttääkö se virheen?

Jos virheilmoitus näkyy, voit liittää sen sellaisenaan.`;
  }

  return `Got it — you mean a program/software, not RAM.

What exactly is happening with the program?
For example: does it fail to start, freeze, close by itself, run slowly, show an error, or something else?

If there is an error message, you can paste it exactly as shown.`;
}

V.handle=function(text,l){
  const raw=String(text||"");
  const language=lang(raw);

  // Highest priority: explicit software words must NEVER become RAM.
  if(isSoftwareToken(raw) && !isRamToken(raw)){
    // If the message has a concrete symptom, give the old engine one chance
    // after protecting it from the "ram" substring bug.
    const t=clean(raw);
    const hasSymptom =
      /\b(?:freeze|freezing|crash|crashing|close|closing|slow|error|won't start|wont start|not working)\b/i.test(t) ||
      /(?:зависа|вылета|закрыва|медлен|тормоз|ошиб|не\s+запуска|не\s+работа)/i.test(t) ||
      /\b(?:jääty|kaatu|sulke|hidas|virhe|ei käynnisty|ei toimi)\b/i.test(t);

    if(!hasSymptom || onlySoftwareWord(raw)){
      return {type:"answer",text:softwareAnswer(language)};
    }

    // For a symptomatic software sentence, temporarily replace software words
    // with APP so no legacy "ram" substring matcher can see "program".
    const safe = raw
      .replace(/\bprogrammes?\b/gi,"app")
      .replace(/\bprograms?\b/gi,"app")
      .replace(/\bapplications?\b/gi,"app")
      .replace(/\bsoftware\b/gi,"app");

    const result=old(safe,l);

    // If legacy routing still returns a RAM definition, override it.
    if(result && typeof result.text==="string"){
      const low=result.text.toLowerCase();
      const ramLike =
        low.includes("ram is working memory") ||
        low.includes("ram —") ||
        low.includes("оперативн") ||
        low.includes("keskusmuisti");
      if(!ramLike) return result;
    }

    return {type:"answer",text:softwareAnswer(language)};
  }

  return old(text,l);
};

window.ANITA_V16_2={
  version:"16.2",
  isRamToken,
  isSoftwareToken
};

console.log("[ANITA v16.2] Strict RAM vs Program fix loaded");
})();

/* ================= ANITA v16.3 NEW REQUEST PRIORITY ROUTER =================
   Fixes stale-context hijacking.

   Problem:
   A previous diagnostic question could wrongly treat a NEW full request such as:
     "Программа не работает"
   as if it were a short answer to the previous branch.

   New priority:
   1) Detect a complete/new IT request first.
   2) If it is a new request, reset incompatible old answer/menu state.
   3) Then route the new request normally.
   4) Only genuinely short answers like yes/no/done/1/2/3 remain attached
      to the previous question.

   Examples:
     "да" -> continue previous branch
     "не помогло" -> continue previous branch
     "сделал" -> continue previous branch
     "2" -> continue previous menu

     "Программа не работает" -> NEW software issue
     "Теперь пропал интернет" -> NEW internet issue
     "Монитор не показывает изображение" -> NEW display issue
     "Chrome пишет ERR_CONNECTION_RESET" -> NEW browser/network issue
   ========================================================================== */
(function(){
"use strict";

if(!window.ANITA_V12 || typeof window.ANITA_V12.handle!=="function") return;

const V = window.ANITA_V12;
const old = V.handle.bind(V);
const S = V.state;

function clean(s){
  return String(s||"")
    .toLowerCase()
    .replace(/ё/g,"е")
    .replace(/[?!.,:;()[\]{}"“”]/g," ")
    .replace(/\s+/g," ")
    .trim();
}

function langOf(text){
  const st=String(S.language||"").toLowerCase();
  if(st==="ru"||st==="en"||st==="fi") return st;
  if(/[а-яё]/i.test(text||"")) return "ru";
  if(/[äöå]/i.test(text||"")) return "fi";
  return "en";
}

function isShortContextReply(text){
  const t=clean(text);

  // Numbers / menu answers
  if(/^[1-9]$/.test(t)) return true;

  // RU short contextual replies
  if(/^(да|нет|не знаю|сделал|сделала|готово|не помогло|не сработало|заработало|работает|не работает пока|так же|тоже самое|то же самое|дальше|ок|окей)$/.test(t)) return true;

  // EN
  if(/^(yes|no|not sure|i don't know|i dont know|done|ready|did it|didn't help|didnt help|still doesn't work|still doesnt work|it worked|works now|same|same thing|next|ok|okay)$/.test(t)) return true;

  // FI
  if(/^(kyllä|ei|en tiedä|valmis|tein sen|ei auttanut|ei toimi vielä|toimii|nyt toimii|sama|seuraava|ok)$/.test(t)) return true;

  return false;
}

function hasStrongNewIssueSignal(text){
  const t=clean(text);

  // Software
  if(/(?:^|\s)(?:program|programme|app|application|software|программа|приложение|софт|ohjelma|sovellus)(?=\s|$)/i.test(t) &&
     /(?:не\s+работа|не\s+запуска|зависа|вылета|закрыва|ошиб|медлен|тормоз|not\s+working|won't\s+start|wont\s+start|freeze|crash|close|error|slow|ei\s+toimi|ei\s+käynnisty|jääty|kaatu|virhe|hidas)/i.test(t))
    return true;

  // Internet / network
  if(/(?:интернет|вай ?фай|wifi|wi-fi|network|connection|netti|verkko)/i.test(t) &&
     /(?:нет|пропал|не\s+работа|отключ|медлен|падает|disconnected|no\s+internet|not\s+working|drops|slow|ei\s+toimi|katkea|hidas)/i.test(t))
    return true;

  // Monitor / display
  if(/(?:монитор|экран|monitor|screen|display|näyttö)/i.test(t) &&
     /(?:не\s+работа|нет\s+изображ|не\s+показы|черн|no\s+picture|no\s+display|not\s+working|black\s+screen|ei\s+kuvaa|ei\s+toimi|musta\s+näyttö)/i.test(t))
    return true;

  // Computer / laptop
  if(/(?:комп\w*|компьютер\w*|пк|ноут\w*|pc|computer|laptop|machine|rig|tietokone|kone|läppäri)/i.test(t) &&
     /(?:не\s+работа|тормоз|медлен|зависа|не\s+включ|перезагружа|ошиб|slow|freeze|crash|won't\s+turn\s+on|wont\s+turn\s+on|error|hidas|jääty|ei\s+käynnisty|virhe)/i.test(t))
    return true;

  // Explicit technical error/code is always a strong new request.
  if(/\b(?:ERR_[A-Z0-9_]+|DNS_[A-Z0-9_]+|0x[0-9a-fA-F]{6,16}|STOP\s*CODE)\b/.test(String(text||""))) return true;

  // "now / теперь" + a new concrete symptom
  if(/(?:^|\s)(?:теперь|сейчас|now|nyt)(?=\s|$)/i.test(t) &&
     /(?:интернет|монитор|экран|программа|program|app|комп|computer|ошиб|error|не\s+работа|not\s+working|пропал|gone)/i.test(t))
    return true;

  return false;
}

function isCompleteNewRequest(text){
  const t=clean(text);
  if(!t) return false;
  if(isShortContextReply(t)) return false;

  if(hasStrongNewIssueSignal(text)) return true;

  // Any reasonably descriptive sentence containing an IT object + a problem verb
  const words=t.split(/\s+/).filter(Boolean);
  if(words.length>=2){
    const object =
      /(?:комп|компьютер|пк|ноут|program|programme|app|application|software|программа|приложение|монитор|экран|internet|интернет|wifi|вай ?фай|browser|браузер|printer|принтер|windows|винда|tietokone|ohjelma|näyttö|netti|selain|tulostin)/i.test(t);

    const problem =
      /(?:проблем|не\s+работа|не\s+запуска|зависа|вылета|тормоз|медлен|пропал|ошиб|problem|issue|not\s+working|won't|wont|freeze|crash|slow|error|ongelma|ei\s+toimi|ei\s+käynnisty|jääty|kaatu|hidas|virhe)/i.test(t);

    if(object && problem) return true;
  }

  return false;
}

function clearAnswerContext(){
  // Clear only "answer to previous question" state.
  // Do not wipe persistent visitor/rating/learning data.
  S.lastQuestion=null;
  S.lastInstruction=null;
  S.awaitingResult=false;
  S.awaitingGenericSymptom=false;
  S.awaitingMenu=false;
  S.activeMenu=null;
  S.menu=null;
  S.pendingChoice=null;
  S.lastProcedureAction=null;

  // Let the new request establish its own branch.
  S.currentSymptom=null;
  S.observationProcess=null;
}

function softwareDirectAnswer(l){
  S.rootProblem="software_problem";
  S.issue="software_problem";
  S.currentSymptom="not_working";
  S.lastQuestion="software_symptom_detail";

  if(l==="ru"){
    return `Поняла — проблема с программой.

Что именно происходит?
1. Не запускается
2. Запускается и сразу закрывается
3. Зависает
4. Работает медленно
5. Показывает ошибку
6. Что-то другое

Если появляется ошибка — можешь скопировать её сюда как есть.`;
  }

  if(l==="fi"){
    return `Selvä — ongelma liittyy ohjelmaan.

Mitä tarkalleen tapahtuu?
1. Ei käynnisty
2. Käynnistyy ja sulkeutuu heti
3. Jäätyy
4. Toimii hitaasti
5. Näyttää virheen
6. Jotain muuta

Jos näkyy virheilmoitus, voit liittää sen tähän sellaisenaan.`;
  }

  return `Got it — the problem is with a program.

What exactly happens?
1. It doesn't start
2. It opens and immediately closes
3. It freezes
4. It runs slowly
5. It shows an error
6. Something else

If there is an error message, paste it here exactly as shown.`;
}

function isGenericSoftwareNotWorking(text){
  const t=clean(text);
  return (
    /^(?:программа|приложение)\s+не\s+работает$/i.test(t) ||
    /^(?:program|programme|app|application)\s+(?:is\s+)?not\s+working$/i.test(t) ||
    /^(?:ohjelma|sovellus)\s+ei\s+toimi$/i.test(t)
  );
}

V.handle=function(text,l){
  const raw=String(text||"");
  const language=langOf(raw);

  // A complete new request must override stale conversation state.
  if(isCompleteNewRequest(raw)){
    clearAnswerContext();

    // Directly handle the exact case from the bug report so no old yes/no
    // handler can capture it again.
    if(isGenericSoftwareNotWorking(raw)){
      return {type:"answer",text:softwareDirectAnswer(language)};
    }

    return old(raw,l);
  }

  // Short responses remain attached to the previous question/menu.
  return old(text,l);
};

window.ANITA_V16_3={
  version:"16.3",
  isShortContextReply,
  hasStrongNewIssueSignal,
  isCompleteNewRequest
};

console.log("[ANITA v16.3] New Request Priority Router loaded");
})();

/* ================= ANITA v16.4 AUTO LANGUAGE + RU SOFTWARE ROUTER FIX =================
   Goals:
   1. In AUTO, CURRENT message language wins:
      Cyrillic Russian -> RU, Finnish -> FI, Latin English -> EN.
   2. Manual language selection still wins over AUTO.
   3. "Программа не работает" is always a NEW software issue, never an old
      yes/no/context reply.
   4. Same intent routing across RU/EN/FI; only answer text changes.
   ==================================================================================== */
(function(){
"use strict";

if(!window.ANITA_V12 || typeof window.ANITA_V12.handle!=="function") return;

const V = window.ANITA_V12;
const previousHandle = V.handle.bind(V);
const S = V.state || {};

function normalize(s){
  return String(s||"")
    .toLowerCase()
    .replace(/ё/g,"е")
    .replace(/[?!.,:;()[\]{}"“”]/g," ")
    .replace(/\s+/g," ")
    .trim();
}

function currentManualLanguage(){
  // Tilda buttons use .langBtn[data-lang]. The active button is the most
  // reliable UI source and avoids stale internal state.
  const active = document.querySelector("#anitaDemoRoot .langBtn.active");
  if(active){
    const x = String(active.dataset.lang||"").toLowerCase();
    if(["ru","en","fi"].includes(x)) return x;
    if(x==="auto") return null;
  }

  try{
    if(typeof languageMode !== "undefined"){
      const x=String(languageMode||"").toLowerCase();
      if(["ru","en","fi"].includes(x)) return x;
      if(x==="auto") return null;
    }
  }catch(_){}

  return null;
}

function detectCurrentMessageLanguage(text){
  const raw=String(text||"");

  // Cyrillic is a very strong RU signal.
  if(/[а-яё]/i.test(raw)) return "ru";

  // Finnish-specific letters / common Finnish IT words.
  if(/[äöå]/i.test(raw) ||
     /\b(?:tietokone|ohjelma|sovellus|ongelma|näyttö|netti|selain|tulostin|ei toimi|ei käynnisty|hidas|virhe)\b/i.test(raw))
    return "fi";

  if(/[a-z]/i.test(raw)) return "en";

  return null;
}

function effectiveLanguage(text, supplied){
  const manual=currentManualLanguage();
  if(manual) return manual;

  // AUTO: always prefer CURRENT message over remembered/default state.
  return detectCurrentMessageLanguage(text) ||
         (["ru","en","fi"].includes(String(supplied||"").toLowerCase()) ? String(supplied).toLowerCase() : null) ||
         "en";
}

function resetStaleQuestionContext(){
  // Reset transient conversational answer state only.
  // Do NOT touch visitor/rating/learning storage.
  S.lastQuestion=null;
  S.lastInstruction=null;
  S.awaitingResult=false;
  S.awaitingGenericSymptom=false;
  S.awaitingMenu=false;
  S.activeMenu=null;
  S.menu=null;
  S.pendingChoice=null;
  S.lastProcedureAction=null;
  S.currentSymptom=null;
  S.observationProcess=null;
}

function isSoftwareNotWorking(text){
  const t=normalize(text);

  return (
    /^(?:программа|приложение|софт)\s+(?:не\s+работает|не\s+запускается)$/i.test(t) ||
    /^(?:program|programme|app|application|software)\s+(?:(?:is\s+)?not\s+working|won't\s+start|wont\s+start)$/i.test(t) ||
    /^(?:ohjelma|sovellus)\s+(?:ei\s+toimi|ei\s+käynnisty)$/i.test(t)
  );
}

function softwareReply(l){
  S.rootProblem="software_problem";
  S.issue="software_problem";
  S.currentSymptom="not_working";
  S.lastQuestion="software_symptom_detail";
  S.language=l;

  if(l==="ru"){
    return `Поняла — проблема с программой.

Что именно происходит?
1. Не запускается
2. Запускается и сразу закрывается
3. Зависает
4. Работает медленно
5. Показывает ошибку
6. Что-то другое

Если появляется ошибка, можешь скопировать её сюда как есть.`;
  }

  if(l==="fi"){
    return `Selvä — ongelma liittyy ohjelmaan.

Mitä tarkalleen tapahtuu?
1. Ei käynnisty
2. Käynnistyy ja sulkeutuu heti
3. Jäätyy
4. Toimii hitaasti
5. Näyttää virheen
6. Jotain muuta

Jos virheilmoitus näkyy, voit liittää sen tähän sellaisenaan.`;
  }

  return `Got it — the problem is with a program.

What exactly happens?
1. It doesn't start
2. It opens and immediately closes
3. It freezes
4. It runs slowly
5. It shows an error
6. Something else

If there is an error message, paste it here exactly as shown.`;
}

V.handle=function(text,l){
  const raw=String(text||"");
  const effective=effectiveLanguage(raw,l);

  // Keep state synchronized with the actual response language.
  S.language=effective;

  // Highest-priority full-intent route. This executes BEFORE legacy
  // yes/no/menu/context handlers.
  if(isSoftwareNotWorking(raw)){
    resetStaleQuestionContext();
    return {type:"answer", text:softwareReply(effective)};
  }

  // For every other request, pass the freshly detected language into the
  // existing engine. This fixes AUTO replying in English to Russian input.
  return previousHandle(raw,effective);
};

window.ANITA_V16_4={
  version:"16.4",
  detectCurrentMessageLanguage,
  effectiveLanguage,
  isSoftwareNotWorking
};

console.log("[ANITA v16.4] AUTO language + RU software router fix loaded");
})();

/* ================= ANITA v16.5 MAIN PIPELINE LANGUAGE FIX =================
   IMPORTANT:
   The Tilda front-end sends messages through window.ANITA_V7.handle(q, l).
   Therefore this fix wraps the ACTUAL main pipeline directly, instead of
   relying only on nested ANITA_V12 wrappers.

   Fixes:
   - AUTO Russian message -> Russian reply.
   - Manual Russian -> Russian reply.
   - "Программа не работает" -> Russian software troubleshooting.
   - "program not working" -> English when AUTO/English.
   - "ohjelma ei toimi" -> Finnish when AUTO/Finnish.
   - Keeps selected language supplied by Tilda's processMessage(q,l).
   - Removes duplicate JS-created microphone if Tilda already has #micButton.
   ========================================================================== */
(function(){
"use strict";

if(!window.ANITA_V7 || typeof window.ANITA_V7.handle!=="function") return;

const previousMainHandle = window.ANITA_V7.handle.bind(window.ANITA_V7);

function norm(s){
  return String(s||"")
    .toLowerCase()
    .replace(/ё/g,"е")
    .replace(/[?!.,:;()[\]{}"“”]/g," ")
    .replace(/\s+/g," ")
    .trim();
}

function messageLanguage(text, supplied){
  const l=String(supplied||"").toLowerCase();

  // The Tilda processMessage already resolves AUTO -> ru/en/fi and manual
  // selection -> chosen language. Trust it first.
  if(["ru","en","fi"].includes(l)) return l;

  const raw=String(text||"");
  if(/[а-яё]/i.test(raw)) return "ru";
  if(/[äöå]/i.test(raw) ||
     /\b(?:tietokone|ohjelma|sovellus|ongelma|näyttö|netti|selain|tulostin|ei toimi|ei käynnisty|hidas|virhe)\b/i.test(raw))
    return "fi";
  return "en";
}

function isSoftwareNotWorking(text){
  const t=norm(text);
  return (
    /^(?:программа|приложение|софт)\s+(?:не\s+работает|не\s+запускается)$/i.test(t) ||
    /^(?:program|programme|app|application|software)\s+(?:(?:is\s+)?not\s+working|won't\s+start|wont\s+start)$/i.test(t) ||
    /^(?:ohjelma|sovellus)\s+(?:ei\s+toimi|ei\s+käynnisty)$/i.test(t)
  );
}

function clearTransientState(){
  try{
    const S=window.ANITA_V12 && window.ANITA_V12.state;
    if(!S) return;
    S.lastQuestion=null;
    S.lastInstruction=null;
    S.awaitingResult=false;
    S.awaitingGenericSymptom=false;
    S.awaitingMenu=false;
    S.activeMenu=null;
    S.menu=null;
    S.pendingChoice=null;
    S.lastProcedureAction=null;
    S.currentSymptom=null;
    S.observationProcess=null;
  }catch(_){}
}

function syncLanguage(l){
  try{
    if(window.ANITA_V12 && window.ANITA_V12.state){
      window.ANITA_V12.state.language=l;
    }
  }catch(_){}
}

function softwareReply(l){
  syncLanguage(l);

  if(l==="ru"){
    return {
      type:"answer",
      text:`Поняла — проблема с программой.

Что именно происходит?
1. Не запускается
2. Запускается и сразу закрывается
3. Зависает
4. Работает медленно
5. Показывает ошибку
6. Что-то другое

Если появляется ошибка, можешь скопировать её сюда как есть.`
    };
  }

  if(l==="fi"){
    return {
      type:"answer",
      text:`Selvä — ongelma liittyy ohjelmaan.

Mitä tarkalleen tapahtuu?
1. Ei käynnisty
2. Käynnistyy ja sulkeutuu heti
3. Jäätyy
4. Toimii hitaasti
5. Näyttää virheen
6. Jotain muuta

Jos virheilmoitus näkyy, voit liittää sen tähän sellaisenaan.`
    };
  }

  return {
    type:"answer",
    text:`Got it — the problem is with a program.

What exactly happens?
1. It doesn't start
2. It opens and immediately closes
3. It freezes
4. It runs slowly
5. It shows an error
6. Something else

If there is an error message, paste it here exactly as shown.`
  };
}

window.ANITA_V7.handle=function(text,l){
  const resolved=messageLanguage(text,l);

  // Synchronize nested conversation state BEFORE any old router runs.
  syncLanguage(resolved);

  // Highest-priority direct new-intent route.
  if(isSoftwareNotWorking(text)){
    clearTransientState();
    syncLanguage(resolved);
    return softwareReply(resolved);
  }

  return previousMainHandle(text,resolved);
};

// Tilda now owns the microphone UI. Remove the extra microphone that the
// older v16 knowledge module may have inserted.
function removeDuplicateMic(){
  const tildaMic=document.getElementById("micButton");
  const injected=document.getElementById("anitaMic");
  const injectedStatus=document.getElementById("anitaVoiceStatus");

  if(tildaMic && injected){
    try{ injected.remove(); }catch(_){}
  }
  if(tildaMic && injectedStatus){
    try{ injectedStatus.remove(); }catch(_){}
  }
}
removeDuplicateMic();
setTimeout(removeDuplicateMic,0);
setTimeout(removeDuplicateMic,500);

window.ANITA_V16_5={
  version:"16.5",
  messageLanguage,
  isSoftwareNotWorking
};

console.log("[ANITA v16.5] MAIN pipeline language fix loaded");
})();
