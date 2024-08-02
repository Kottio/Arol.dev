const list = document.getElementById('Itemlist')
const form = document.querySelector('#New-items-form')
const errorMessage = document.querySelector('.ErrorMessage')


//ALL FUNCTIONS
//Save the List items Informations within the Local Storage
function SaveElements(){
  const IteminList = []
  elementInList = list.querySelectorAll('.list-element')

  elementInList.forEach(function(item){
    let name = item.querySelectorAll('.items-text')[0].textContent
    let quantity = item.querySelectorAll('.items-text')[1].textContent
    let Ischecked = item.querySelector('input').checked
    IteminList.push({name,quantity, checked:Ischecked})
  });

  localStorage.setItem('GroceryList', JSON.stringify(IteminList))
  }


  //Load All the elements from the LocalStorage and Draw them on the page. 
function LoadElements(){
  let ElementsInLocal = JSON.parse(localStorage.getItem('GroceryList'))
  ElementsInLocal.forEach(item=>{
    draw(item.name, item.quantity, item.checked)
  })}


//Delete List item with button
function deleteElement(button,element){
  button.addEventListener('click', ()=>{
    list.removeChild(element);
    SaveElements()})
}


//Changing Style of Element if checked
function checkingList(checkbox, textElements){
  checkbox.addEventListener('change', function(){
  if(this.checked){ textElements.forEach((item)=>{
    item.style ="text-decoration: line-through; color:grey";SaveElements()
  }
)}
  else{textElements.forEach((item)=>{
    item.style ="text-decoration:none";SaveElements()
  })}})
}

//Drawing Element on the List. 
function draw(name,quantity,Checked=false){
  const NewListElement = document.createElement('li')
  NewListElement.classList.add('list-element')

  const FirstDiv = document.createElement('div')
  const SecondDiv = document.createElement('div')

  const CheckBox = document.createElement('input')
  CheckBox.type = 'checkbox'
  CheckBox.classList.add('items-elements')
  CheckBox.checked =Checked
  FirstDiv.appendChild(CheckBox) 

  const ItemName = document.createElement('span')
  ItemName.classList.add('items-elements', 'items-text')
  ItemName.textContent = name
  FirstDiv.appendChild(ItemName)

  const ItemQuantity = document.createElement('span')
  ItemQuantity.classList.add('items-elements', 'items-text')
  ItemQuantity.textContent = quantity
  SecondDiv.appendChild(ItemQuantity)

  const DeleteButton = document.createElement('button')
  DeleteButton.classList.add('Input-forms', 'button-list','items-elements')
  DeleteButton.textContent ='Delete'
  SecondDiv.appendChild(DeleteButton)
  deleteElement(DeleteButton,NewListElement)

  
  checkingList(CheckBox, [ItemName, ItemQuantity]);
  //Need to add the following code as the Cheching Event only take into account 'changes' in the checkbox. 
  if(CheckBox.checked){ 
    ItemName.style = "text-decoration: line-through; color:grey";
    ItemQuantity.style = "text-decoration: line-through; color:grey";}


  NewListElement.appendChild(FirstDiv)
  NewListElement.appendChild(SecondDiv)

  list.appendChild(NewListElement)


}

//Submitting New element to the list. 
form.addEventListener('submit', function(event){
  event.preventDefault()
  let name = document.getElementById('Item-name').value
  let quantity = document.getElementById('item-quantity').value

  errorMessage.textContent = '';
  if(!name && !quantity){
      errorMessage.textContent ="Oh everything is empty...  Well then, that's what you'll get, NOTHING!"}
      else if(!name){
      errorMessage.textContent =`Well thanks Arol, I will buy you ${quantity} Toothbrushes.. Is this really what you want!?`}
      else if(!quantity){
      errorMessage.textContent =`Nice! I will therefore buy 1000000 ${name}s.. It's not that hard to tell me how many you want!`}
  else{draw(name,quantity)}

  SaveElements()
  form.reset();
})

//Load the element and Draw them when page reloads. 
document.addEventListener('DOMContentLoaded', LoadElements);


