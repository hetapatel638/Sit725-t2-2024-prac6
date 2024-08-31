document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  
    var timeElems = document.querySelectorAll('.timepicker');
    var timeInstances = M.Timepicker.init(timeElems);
  });
  
  // Handle form submission
  document.getElementById('expenseForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var expenseName = document.getElementById('expenseName').value;
    var expenseAmount = document.getElementById('expenseAmount').value;
    var expenseDescription = document.getElementById('expenseDescription').value;
    var expenseTime = document.getElementById('expenseTime').value;
  
    // Add expense to the list
    var expenseList = document.querySelector('#expenseList .row');
    var newExpenseCard = document.createElement('div');
    newExpenseCard.className = 'col s12 m4';
    newExpenseCard.innerHTML = `
      <div class="card hoverable">
        <div class="card-image">
          <img src="images/images.jpeg" alt="Expense Image">
          <span class="card-title">${expenseName}</span>
        </div>
        <div class="card-content">
          <p><strong>Amount:</strong> $${expenseAmount}</p>
          <p><strong>Description:</strong> ${expenseDescription}</p>
          <p><strong>Time:</strong> ${expenseTime}</p>
        </div>
      </div>
    `;
    expenseList.appendChild(newExpenseCard);
  
    // Show success message
    document.getElementById('successMessage').style.display = 'block';
  
    // Close the modal
    var formModal = M.Modal.getInstance(document.getElementById('formModal'));
    formModal.close();
  
    // Clear the form
    document.getElementById('expenseForm').reset();
  });