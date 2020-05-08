
let nodelist = document.getElementsByTagName("LI");
for (let i = 0; i < nodelist.length; i ++)
{
    let span = document.createElement("SPAN");
    let text = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(text);
    nodelist[i].appendChild(span);
}

/* close */
let close = document.getElementsByClassName("close");
for (let i = 0; i < close.length; i ++)
{
    close[i].onclick = function()
    {
        let div = this.parentElement;
        div.style.display = "none";
    }
}
/*checked */
let ulist = document.querySelector('ul');
ulist.addEventListener('click', function(ev) {
        if(ev.target.tagName === 'LI') 
        {
            ev.target.classList.toggle('checked');
        }
    } , false);
/* add */
function newElement()
{
    let li = document.createElement("li");
    let inputValue = document.getElementById("addInput").value;
    let t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '')
    {
        alert("You can't add an empty task");
    }
    else
    {
        document.getElementById("list").appendChild(li);
    }
    document.getElementById("addInput").value = "";
    let span = document.createElement("SPAN");
    let text = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(text);
    li.appendChild(span);
    for (let i = 0; i < close.length;i ++)
    {
        close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}
