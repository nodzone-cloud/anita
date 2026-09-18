(function(root){"use strict";const A=root.ANITA51=root.ANITA51||{};
const Q={
business:{id:"business",field:"business",type:"free",prompt:{en:"Tell me a little about your business or project — what do you do?",ru:"Расскажите немного о вашем бизнесе или проекте — чем вы занимаетесь?",fi:"Kerro hieman yrityksestäsi tai projektistasi — mitä teet?"}},
goal:{id:"goal",field:"goal",type:"free",prompt:{en:"What should visitors be able to do on the website?",ru:"Что посетители должны иметь возможность делать на сайте?",fi:"Mitä kävijöiden pitäisi voida tehdä sivustolla?"}},
size:{id:"size",field:"size",type:"choice",prompt:{en:"Roughly what size of site do you need?",ru:"Какого примерно размера сайт нужен?",fi:"Minkä kokoista sivustoa tarvitset?"},options:["one page","a few pages","larger multi-page"]},
requirements:{id:"requirements",field:"requirements",type:"free",prompt:{en:"Anything specific you already know you need?",ru:"Есть ли что-то конкретное, что уже точно нужно?",fi:"Onko jotain erityistä, mitä jo tiedät tarvitsevasi?"}},
confirm:{id:"confirm",type:"confirm",prompt:{en:"Does this brief look correct?",ru:"Этот бриф составлен правильно?",fi:"Onko tämä brief oikein?"}}
};
A.Questions={get:id=>Q[id]||null,all:Q,prompt(q,l){return q&&q.prompt?(q.prompt[l]||q.prompt.en):""}};
})(window);