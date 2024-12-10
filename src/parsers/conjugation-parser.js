var HTMLParser = require('node-html-parser');


function parseHTML(HTML_text){
    var root = HTMLParser.parse(HTML_text)
    var contenu = root.getElementById("contenu")

    var conjugations_dict = {};

    var last_header = ""
    contenu.childNodes.forEach(node=> {
        if(node.rawTagName =="h2"){
            last_header = node.childNodes[0].innerHTML
            if (!(last_header in conjugations_dict)){
                conjugations_dict[last_header] = {}
            }
        }
        if(node.rawAttributes != undefined){
            if(node.rawAttributes.class =="tempstab"){
                if (last_header in conjugations_dict){
                    conjugations_dict[last_header][node.childNodes[0].innerHTML]  ={}
                    conjugations_dict[last_header][node.childNodes[0].innerHTML]["innerHTML"]  = node.childNodes[1].innerHTML
                }
            }
        }    
    });

    Object.keys(conjugations_dict).forEach(key =>{ 
        if(!key.startsWith("Traduzione")){
            Object.keys(conjugations_dict[key]).forEach(tense =>{
                var conjugation_html = conjugations_dict[key][tense]["innerHTML"]
                conjugation_str = conjugation_html.replaceAll("<br>","").replaceAll("<b>","").replaceAll("&ograve","ò").replaceAll("&agrave","à").replaceAll("'","''")
                var conjugation_list = conjugation_str.split("</b>")

                conjugation_list = conjugation_list.filter( c =>(c !=""))
                
                conjugation_list.forEach(conj => {
                    splitted =  conj.split(" ")
                    pronomi  = splitted[0]
                    splitted.shift()//remove first element which is prononmi io,tu,etc.
                    verb = splitted.join(" ")
                    conjugations_dict[key][tense][pronomi] = verb 
                })
                delete conjugations_dict[key][tense]["innerHTML"]
            })  
        }else{
            delete conjugations_dict[key]
        }
    })



    return conjugations_dict
} 

module.exports = { parseHTML};