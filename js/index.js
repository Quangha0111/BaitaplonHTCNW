var x = document.querySelector('.go_to_top');
x.addEventListener('click',function(){
    window.scrollTo(0,0);
})

//validate_register

const isPassword = (value) => {
    const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return reg.test(value);
}

const isRequired = (value) => {
    return value === "" || value === undefined || value === null ? false : true;
}
const isConfirmPassword = (value1, value2) => {
    return value2 === "" || value2 === undefined || value2 === null || value1 !== value2 ? false : true;
}
const isPhone = (value) => {
    //regex phone
    const reg = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    return reg.test(value);
}
const isEmail = (value) => {
    const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return reg.test(value);
}
const show_message = (Id, message) => {
    var el = document.querySelector(Id).parentElement.querySelector('.form-message');
    el.innerHTML = message;
}

$(document).ready(function() {
    
   
    // delete cart item
    // if (localStorage.getItem('carts')===undefined) {
        initialCart()
    // }


    //end
    const form1 =$('#form-1 input')
    $.each(form1, (index,item)=>{
        $(item).on('blur', function(){
            validate_register();
        })
        $(item).on('input', function(){
            validate_register();
        })
    })

    const RegisterForm = $('#form-1');
    RegisterForm.on('submit', (e)=>{
        e.preventDefault()
        const name = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmpass = document.getElementById('password_confirmation').value;
        const users  = JSON.parse(localStorage.getItem('dangki'))||[];
        // console.log(users);
        const user ={
            name:name,
            email:email,
            password:password,
            confirmpass:confirmpass
        }
        users.push(user);
        if (validate_register()===true) {
            
            // RegisterForm.submit();
            localStorage.setItem("dangki",JSON.stringify(users))
            RegisterForm.trigger("reset");
            window.location =('profile.html');
    
        }
    
    });
    const user = JSON.parse(localStorage.getItem("userLogin"));
    $('#user').text(user.name);
    $('#ten').text(user.name);
    $('#email').text(user.email);
    // console.log(user);

    // Login user
    $('#form_login').submit(function(event) {
        event.preventDefault();
        const users = JSON.parse(localStorage.getItem('dangki'));
        var email1 =$('#email1').val();
        var password1 =$('#password1').val();
        console.log(email1,password1);
        let flag = false;
        users.forEach(user => {
            console.log("abc",user);
            if(user.password === password1 && user.email === email1){
                flag = true
                const {name, email} = user
                localStorage.setItem('userLogin', JSON.stringify({name,email}))
            }
        })
        if(flag===false){
            alert('Sai Email hoặc Mật Khẩu');
        }else{
            window.location= ('profile.html');
        }
            
    })
    //Tính tiền =
    tinhtien(JSON.parse(localStorage.getItem('carts')))
    
     
});
const validate_register = () => {
    const name = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmpass = document.getElementById('password_confirmation').value;
    isRequired(name) === false ?
        show_message('#fullname', "Không để trông") :
        show_message('#fullname', "");
    isPassword(password) === false ?
        show_message('#password', "Mật khẩu >8 và cần 1 kí tự và số.") :
        show_message('#password', "");
    isEmail(email)=== false?
        show_message('#email',"Nhập email có dạng abc@gmail.com"):
        show_message('#email',"")
    isConfirmPassword(password, confirmpass) === false ?
        show_message('#password_confirmation', "Hai mật khẩu không trùng nhau") :
        show_message('#password_confirmation', "");
    if (isRequired(name) &&  isEmail(email)&& 
        isPassword(password) &&
        isConfirmPassword(password, confirmpass)
    ) {
        return true;
    } else {
        return false;
    }
}
const initialCart = ()=>{
    const carts =[
        {
            id:1,
            product:{
                name: "Đàn guitar điện Yamaha",
                price:900,
                category:"Mau xanh",
                url:"../img/dan_guitar_dien_yamaha_pac612viifm_xanhx500x500x4.jpg"
            },
            quantity:2,
        },
        {
            id:2,
            product:{
                name: "Đàn guitar điện Yamaha 2",
                price:1000,
                category:"Mau xanh",
                url:"../img/dan_guitar_dien_yamaha_pac612viifm_xanhx500x500x4.jpg"
            },
            quantity:4,
        },
        {
            id:3,
            product:{
                name: "Đàn guitar điện Yamaha 3",
                price:999,
                category:"Mau xanh",
                url:"../img/dan_guitar_dien_yamaha_pac612viifm_xanhx500x500x4.jpg"
            },
            quantity:6,
        },
        {
            id:4,
            product:{
                name: "Đàn guitar điện Yamaha",
                price:900,
                category:"Mau xanh",
                url:"../img/dan_guitar_dien_yamaha_pac612viifm_xanhx500x500x4.jpg"
            },
            quantity:2,
        },
        {
            id:5,
            product:{
                name: "Đàn guitar điện Yamaha 2",
                price:1000,
                category:"Mau xanh",
                url:"../img/dan_guitar_dien_yamaha_pac612viifm_xanhx500x500x4.jpg"
            },
            quantity:4,
        },
        {
            id:6,
            product:{
                name: "Đàn guitar điện Yamaha 3",
                price:999,
                category:"Mau xanh",
                url:"../img/dan_guitar_dien_yamaha_pac612viifm_xanhx500x500x4.jpg"
            },
            quantity:6,
        }
    ]
    localStorage.setItem('carts', JSON.stringify(carts))
}





const loadCart = function () {
    var cart = $('.cart-main')
    const carts = JSON.parse(localStorage.getItem('carts'))
    cart.html(
    carts.map((c) => {
      return `
              <div class="card mb-3">
                <div class="card-body">
                  <div class="d-flex justify-content-between">
                    <div class="d-flex flex-row align-items-center">
                      <div>
                        <img
                          src="${c.product.url}"
                          class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;">
                      </div>
                      <div class="ms-3">
                        <h5>${c.product.name}</h5>
                        <p class="small mb-0">${c.product.category}</p>
                      </div>
                    </div>
                    <div class="d-flex flex-row align-items-center" >
                      <div class="px-2 btn_sub " style="cursor: pointer;"  onclick="sub_quantity(this);">-</div> 
                        <input class="fw-normal mb-0 " type="number" min="0" data-id=${c.id}  id="quality" value="${c.quantity}" style="width: 50px;"/>
                        <div class="px-2 btn_add" style="cursor: pointer;"  onclick="add_quantity(this);">+</div>
                      </div>
                    <div class="d-flex flex-row align-items-center">
                      
                      <div style="width: 80px;">
                        <h5 class="mb-0" id="giasp1">${c.product.price}</h5>
                      </div>
                      <a href="#!" style="color: #cecece;"><i class="fas fa-trash-alt delete"  onClick="deleteItem(${c.id});"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            `
    })
  )
  }
  //

   
   
 
  //
  const deleteItem = function(idCart){
    if(confirm('Bạn có muốn xóa không')){
        console.log(this.dataset);
        const carts  = JSON.parse(localStorage.getItem('carts'))
        for (let index = 0; index < carts.length; index++) {
            const element = carts[index];
            // console.log(element.id,idCart,index)
            if(element.id == idCart){
                carts.splice(index,1)
                console.log(element.id,idCart,index)
            }
        }
        localStorage.setItem('carts',JSON.stringify(carts))
        loadCart()
        }
    }
//Tăng sản số lượng
const add_quantity = (e)=>{
    const carts = JSON.parse(localStorage.getItem('carts'))
   const input = e.parentElement.querySelector('input')
   const idCart = input.dataset.id;
   input.value = parseInt(input.value)+1;
   carts.forEach(item => {
        if(item.id == idCart){
            item.quantity = parseInt(input.value)
        }
    });
    localStorage.setItem('carts', JSON.stringify(carts))
    console.log(tinhtien(carts));
}
// Giảm sản số lượng
const sub_quantity = (e)=>{
    const carts = JSON.parse(localStorage.getItem('carts'))
    const input = e.parentElement.querySelector('input')
    input.value = input.value-1;
    const idCart = input.dataset.id;
    if(input.value < 0){
        input.value = 0;
   }
    carts.forEach(item => {
        if(item.id == idCart){
            item.quantity = parseInt(input.value)
        }
    });
    localStorage.setItem('carts', JSON.stringify(carts))
    tinhtien(carts)
    console.log(tinhtien(carts));

}

const tinhtien = (carts)=>{
    console.log(carts);
    let sum = 0;
    carts.forEach(function(item, index){
        sum += item.quantity * item.product.price
    })
    $('.sub_total').text(sum);
    $('.total').text(sum+20);
}   

