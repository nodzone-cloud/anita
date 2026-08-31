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
  for(const g of G)for(const p of g.p){
    let z=normalize(p);
    if(x===z||x.includes(z))return g.a[l]||g.a.en;
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

  V.handle = function(text,l){
    V.turns++;
    V.lastUserText=text;

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
    if(found && /\b(problem|kind of|help|confused|something|not sure|trouble|having)\b/i.test(t)){
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
