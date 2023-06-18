const fullName= document.querySelector("#fullName")
const yourEmail= document.querySelector("#your-email")
const subject= document.querySelector("#subject")
const message= document.querySelector("#message")
const sendBtn= document.querySelector(".send-meassage")

const BASE_URL= "http://localhost:8080/contact"

function emptyRgInput() {
    fullName.value = "";
    yourEmail.value = "";
    subject.value = "";
    message.checked = false;
  }
sendBtn.addEventListener("click",async()=>{
    let userMessage={
        fullName: fullName.value,
        email: yourEmail.value,
        subject:subject.value,
        message:message.value,
    }
    await axios.post(BASE_URL,userMessage)
})