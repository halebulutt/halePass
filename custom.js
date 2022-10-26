



function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// function getCookies() {
//     const cookiesList = decodeURIComponent(document.cookie).split(';')
//     const regex = /.*?(?==)/
//      twitter=123123,password
//     const cookies = cookiesList.map(x => {
//         return {
//             name: x.match(regex)[0],
//             password: x.substr(x.indexOf(",") + 1)
//         }
//     })
//     console.log(cookies);
//     return cookies;
// }

$(document).ready(function () {
    var returnPass = getCookie("halePass");
    if (returnPass.length > 0) {
        //Sistemde şifre var
        $("#lblPasswordTitle").html("Password :");
        $("#btnLogin").html("Login");
    } else {
        //Yeni kullanıcı
        $("#lblPasswordTitle").html("New Password :");
        $("#btnLogin").html("Register");
    }

    /* $("input").on( {
         var TypedText = $("#txtText").val();
         if (TypedText.length < 0) {
             alert("This field cannot be left blank.");
             return;
         }
         else {
             alert("Your password has been successfully saved.")
         }
     }) */

    $("btn").on({
        focus: function () {
            $(this).css({ "background-color": "green", "color": "white" })
        }
    })

    const newPasswordSection = $(".new-password-section")
    const myPasswordsSection = $(".my-passwords-section")
    const passwordGeneratorSection = $(".password-generator-section")
    const settingsSection = $(".settings-section")
    const homeSection = $(".home-section")

    const newSiteNameInput = $("#txtSiteName");
    const newUserNameInput = $("#txtUserName");
    const newPasswordInput = $("#txtNewPassword");
    const newPasswordSaveButton = $("#new-password-save-button");

    $("#my-passwords-button").click(function () {
        myPasswordsSection.show();
        newPasswordSection.hide();
        passwordGeneratorSection.hide();
        settingsSection.hide();
        homeSection.hide();

    });

    $("#new-password-button").click(function () {
        newPasswordSection.show();
        myPasswordsSection.hide();
        passwordGeneratorSection.hide();
        settingsSection.hide();
        homeSection.hide();
    });

    $("#password-generator-button").click(function () {
        passwordGeneratorSection.show();
        myPasswordsSection.hide();
        newPasswordSection.hide();
        settingsSection.hide();
        homeSection.hide();
    });

    $("#settings-button").click(function () {
        settingsSection.show();
        myPasswordsSection.hide();
        newPasswordSection.hide();
        passwordGeneratorSection.hide();
        homeSection.hide();
    });


    $(newPasswordSaveButton).click(function () {
        if (!newSiteNameInput.val() || !newUserNameInput.val() || !newPasswordInput.val()) {
            alert("Do not leave any blank space!");
        } else {

            kayit.push([$("#txtSiteName").val(), $("#txtUserName").val(), $("#txtNewPassword").val()]);
            $("#txtSiteName").val("");
            $("#txtUserName").val("");
            $("#txtNewPassword").val("");
            alert("Your password has been successfully saved.")

        }
    });

})

// function setCookiesTable() {
//     const cookies = getCookies();
//     const tableBody = $("#my-passwords-table-body");
//     cookies.map(x => {
//         const tr = document.createElement("tr");

//         for (const property in x) {
//             console.log(`${property}: ${x[property]}`);
//             const td = document.createElement("td");
//             td.innerText = x[property];
//             tr.append(td);
//         }

//         tableBody.append(tr);
//     })
// }

$("body").on("click", "#btnLogin", function () {

    var returnPass = getCookie("halePass");
    if (returnPass.length > 0) {
        //Sistemde şifre var
        var TypedPassword = $("#txtPassword").val();
        if (TypedPassword != returnPass) {
            alert("The password is incorrect!");
            return;
        } else {
            //Şifre doğru
            LoginDo();
        }
    } else {
        //Yeni kullanıcı
        var TypedPassword = $("#txtPassword").val();
        if (TypedPassword.length < 6) {
            alert("Please create your password with at least 6 characters.");
            return;
        }
        setCookie("halePass", TypedPassword, 365);
        LoginDo();
    }
});

/* $("#site-name").on( {
    var TypedText = $("#txtText").val();
    if (TypedText.length == 0) {
        alert("This field cannot be left blank.");
        return;
    }
    else {
        alert("Your password has been successfully saved.")
    }
}) */



function LoginDo() {
    $(".login-section").css("display", "none");
    $("#menu").css("display", "block");
    $(".home-section").css("display", "block");

}

// var testLoops = "";
// var i;
// for(i=0; i < kayit.length; ++i) {
//     testLoops += "<tr>";
//     testLoops += "<td>" + kayit[i][0] + "</td>";
//     testLoops += "<td>" + kayit[i][1] + "</td>";
//     testLoops += "<td>" + kayit[i][2] + "</td>";
//     testLoops += "</tr>";
// }

// $(myTable).find("tbody").html(testLoops);

var kayit = [];
$("body").on("click", "#my-passwords-button", function () {

    var testLoops = "";
    var i;
    for (i = 0; i < kayit.length; ++i) {
        testLoops += "<tr>";
        testLoops += "<td>" + kayit[i][0] + "</td>";
        testLoops += "<td>" + kayit[i][1] + "</td>";
        testLoops += "<td>" + "<i class=\"fa-solid fa-eye-slash off-eye btnEye\"></i>" + "</td>";
        testLoops += "<td style='display: none;'>" + kayit[i][2] + "</td>";
        testLoops += "</tr>";
    }

    $("#myTable").find("tbody").html(testLoops);
});


$("body").on("click", ".btnEye", function () {
    let promptAnswer = prompt('Enter your password:');
    var returnPass = getCookie("halePass");
    if (returnPass.length > 0) {
        if (promptAnswer != returnPass) {
            alert("Your password is incorrect, please try again!");
            return;
        } else {
            alert($(this).parent().next().html());
        }
    }

});


$("body").on("change","#fileId",function(){
    // var input = document.getElementById("asd").files[0];

    let files = this.files;
    if(files.lenght === 0) {
        return;
    }
    else {
        const file = files[0];
        let reader = new FileReader();
        reader.onload=(e) => {
            const ggg= e.target.result;

            var gelenVeri = "";
            var kayit = gelenVeri.split("£");
            var i;
            for(i = 0; i < kayit.length; i++) {
                if([kayit[i].length > 0])
                testLoops.push([kayit[i].split("&")[0]],[kayit[i].split("&")[1]], [kayit[i].split("&")[2]]);
            }

        };
        reader.onerror=(e)=>alert(e.target.error.name);
        reader.readAsText(file);
    }

});


(function () {
    var textFile = null,
      makeTextFile = function (text) {
        var data = new Blob([text], {type: 'text/plain'});
    
        if (textFile !== null) {
          window.URL.revokeObjectURL(textFile);
        }
    
        textFile = window.URL.createObjectURL(data);
    
        return textFile;
      };
    
    
      var create = document.getElementById('create');
    
      create.addEventListener('click', function () {

        var indirme = "";
        var i;
        for (i=0; i < kayit.length; i++) {
            indirme += kayit[i][0] + "&";
            indirme += kayit[i][1] + "&";
            indirme += kayit[i][2] + "£";
        }
        console.log(kayit);
        console.log(indirme);
        var link = document.getElementById('downloadlink');
        link.href = makeTextFile(indirme);
        link.style.display = 'block';
      }, false);
    })();


// $( document ).ready(function() {
// 	$("#btnExportPasswords").click(function() {
// 		var export_type = $(this).data('export-type');		
// 		$('#my-passwords-button').myPasswords({
// 			type : export_type,			
// 			escape : 'false',
// 			ignoreColumn: []
// 		});		
// 	});
// });
