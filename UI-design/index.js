




addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const isPasswordValid=password=>{
    const reg=/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    return reg.test(String(password))
}

const validateInputs = () => {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

if(passwordValue === '') {
    setError(password, 'Password is required');
} else if (!isPasswordValid(passwordValue)) {
    setError(password, 'Password must be at least 8 character.')
} else {
    setSuccess(password);
}


if(window.Storage)
{
    const email=document.getElementById("email");
    const password=document.getElementById("password");
    const submit=document.getElementById("submit")
    const btns=document.getElementById("btns")
    const digbox=document.getElementById("digbox")
    const whitebg=document.getElementById("white-background")
    const dig=document.getElementById("digbox")

    submit.onclick=function()
    {
        const key=email.value;
        const value=password.value;

        btns.onclick=function(){
            whitebg.style.display="none";
            dig.style.display="none";
            // this.parentNode.remove()
            return false;
        }
        
        if(isValidEmail(key)&& isPasswordValid(value) )
        {
                    //  localStorage.setItem(key,value);
                    // location.reload();        
                    // confirm(`Hi `+ key)   'sindhujas@mailinator.com'
                    // showdialog()
                const data = { name: key, password: value };
                fetch('https://gs-dev.qa-enphaseenergy.com/session-mgr/api/v1/admin/signin/', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
        console.log(data)
        for(let i in data)
        {
            if("GS-Authorization"===i)
            {
              let data1=data[i]
               sessionStorage.setItem("token", data1)
            }
            
            if("Success"===data[i])
            {
                digbox.onclick=function(){
                    // whitebg.style.display="none";
                    // dig.style.display="none";
                    
                    return false;
                }
        
                window.open ('/admin.html', "_newtab" )
                
                // console.log(heading)
               
               
                for(let i in data)
                {
                    if("user_name"===i || "account_company_name"===i || "account_time_zone"===i || "roles"===i)
                    {
                      let data1=data[i]
                      sessionStorage.setItem(i, data1)  
                    }
                } 
            
            
            }

            function showdialog(){
                whitebg.style.display="block";
                dig.style.display="block";
            
                var winWidth=window.innerWidth;
                // var winHeight=window.innerHeight;
            
                dig.style.left=(winWidth/2)-480/2 + "px";
                dig.style.top="150px"
            
            }
            
            showdialog();

        }
       

    })

        
        .catch((error) => {
        console.error('Error:', error);

        });

        
        }      
    }
}
   
}





