
let login_form = document.getElementById("login_form");
let login_btn = document.getElementById("login_button");


let adm_mail = document.getElementById("email");
let user_entry = new Object();
const admin_allowed = {
    email : "real_admin@gmail.com",
    // password : "FtD409AzYfyvQb%FJCzYVmG",//"therealpasswordfestival"
    password : "FtD409AzYfyvQb%FJCzYVmG",//"therealpasswordfestival"
    //"therealpasswordfestival"
    //"therealpasswordfestival"
    key: "VcBZaXq7Aw04HfSjltCFiToEyWNG1Yz9d25eDUQvLkJ3ORupKnmr8g%6bsPxMIh"
};


login_btn.addEventListener('click', function(){
    let adm_pssw = document.getElementById("password").value;
    console.log("escuchando");
    if(!adm_pssw==""){
        console.log("entro pssw: " + adm_pssw);
        
        
        let key =  generateKey();
        console.log("key : " + key);
        let encrypted_pssw = encrypt(adm_pssw, key);
        user_entry['password'] = encrypted_pssw;
        console.log("encriptada: "+ encrypted_pssw);

        if(decrypt(user_entry.password, key) == decrypt(admin_allowed.password, admin_allowed.key)){
            console.log("son iguales");
            alert("Encriptada: "+ user_entry.password+ " Igual a: "+ admin_allowed.password );
            // login_form.action = "/admin_panel.html";
            window.location.replace("Admin/admin_panel.html");
        }else{
            login_form.action = "";
            console.log("NOO son iguales");
            // window.location.replace("/admin_panel.html");
            alert("Correo o contraseña incorrectas"+ user_entry.password) ;
            alert("Correo o contraseña incorrectas");
            location.reload();
            
        }
    }

}  );


////////////////////////////////////////////////////////////////////////////////////// /

// var _charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%";       
// function generateKey() {
//     var str = "";
//     var tar;
//     tar = new Array();
//     for (var c = 0; c < _charset.length; c++) {
//         tar.push(_charset.substring(c, 1));
//     }
//     for (var c = 0; c < _charset.length; c++) {
//         str += tar.splice(Math.round(Math.random() * (tar.length - 1)), 1);
//     }
//     return str;
// }

// function encrypt(v, _key) {
//     var str = "";
//     var key = _key;
//     if (_key.length > 0 && v.length > 0) {
//         //v = Server.URLEncode(v);
//         for (var c = 0; c < v.length; c++) {
//             var ch = _charset.indexOf(v.substring(c, 1));
//             if (ch > -1) {
//                 str += key.substring(ch, 1);
//                 key = rotateKey(key, v.charCodeAt(c));
//             }
//         }
//         return str;
//     } else {
//         return "";
//     }
// }

// function decrypt(v, _key) {
//     var str = "";
//     var key = _charset;
//     if (_key.length > 0 && v.length > 0) {
//         for (var c = 0; c < v.length; c++) {
//             var ch = _key.indexOf(v.substring(c, 1));
//             if (ch > -1) {
//                 str += key.substring(ch, 1);
//                 key = rotateKey(key, -key.charCodeAt(ch));
//             }
//         }
//         return str;
//     } else {
//         return "";
//     }
// }

// function rotateKey(s, amt) {
//     amt = amt % s.length;
//     if (amt < 0) {
//         amt = s.length + amt;
//     }
//     if (amt != 0) {
//         return s.substring(s.length - amt, amt) + s.substring(0, s.length - amt);
//     } else {
//         return decodeURI(s);
//     }
// }

var _charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%";

function generateKey() {
    var str = "";
    var tar;
    tar = new Array();
    for (var c = 0; c < _charset.length; c++) {
        tar.push(_charset.substring(c, c+1));
    }
    for (var c = 0; c < _charset.length; c++) {
        str += tar.splice(Math.round(Math.random() * (tar.length - 1)), 1);
    }
    return str;
}
// https://open.spotify.com/playlist/0lHkea55RnLjhcE9wKGIwb?si=2198184aff184060
function encrypt(v, _key) {
    var str = "";
    var key = _key;
    
    console.log(v.length);
    if (_key.length > 0 && v.length > 0) {
        
        //v = Server.URLEncode(v);
        for (var c = 0; c < v.length; c++) {
            var ch = _charset.indexOf(v.substring(c, c+1));
            
            if (ch > -1) {
                str += key.substring(ch, ch+1);
                key = rotateKey(key, v.charCodeAt(c));
            }
        }
        console.log("encrypted "+ str);
        return str;
    } else {
        return "";
    }
}

function decrypt(v, _key) {
    var str = "";
    var key = _charset;
    if (_key.length > 0 && v.length > 0) {
        for (var c = 0; c < v.length; c++) {
            var ch = _key.indexOf(v.substring(c, c+1));
            if (ch > -1) {
                str += key.substring(ch, ch+1);
                key = rotateKey(key, -key.charCodeAt(ch));
            }
        }
        return str;
    } else {
        return "";
    }
}

function rotateKey(s, amt) {
    amt = amt % s.length;
    if (amt < 0) {
        amt = s.length + amt;
    }
    if (amt != 0) {
        
         return s.substr(s.length - amt, amt) + s.substr(0, s.length - amt);
        // return s.substring(s.length - amt, s.length) + s.substring(0, s.length - amt); // pensar en los negativos
    } else {
        return decodeURI(s);
    }
}