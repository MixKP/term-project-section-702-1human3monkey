document.addEventListener('DOMContentLoaded', function() {
    // Get all quantity input fields
    const quantityInputs = document.querySelectorAll('input[id="quantity"]');
    
    // Add event listeners to each quantity input
    quantityInputs.forEach(input => {
      // Use both input and change events for better UX
      // 'input' fires on every keystroke, 'change' fires when focus is lost
      input.addEventListener('change', updateQuantity);
    });
    
    function updateQuantity(event) {
      const quantityInput = event.target;
      const newQuantity = parseInt(quantityInput.value);
      
      // Get the cart item ID from the parent row
      const row = quantityInput.closest('tr');
      const deleteLink = row.querySelector('a[href^="/cart/delete/"]');
      
      if (!deleteLink) {
        console.error('Could not find cart item ID');
        return;
      }
      
      // Extract cart_item_id from the delete link
      const cartItemId = deleteLink.getAttribute('href').split('/').pop();
      
      // Send AJAX request to update the cart
      fetch('/cart/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
          cart_item_id: cartItemId,
          quantity: newQuantity
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Update the price display
          updatePriceSummary(data);
        } else {
          // Handle error
          alert('Failed to update cart: ' + data.message);
          // Reset to previous value if needed
          quantityInput.value = data.originalQuantity || 1;
        }
      })
      .catch(error => {
        console.error('Error updating cart:', error);
      });
    }
    
    function updatePriceSummary(data) {
      // This function will update the price summary based on the response from the server
      // You should customize this based on your backend response structure
      if (data.orderTotal) {
        document.querySelector('.total-row span:last-child').textContent = 
          `${data.orderTotal} ${data.currency}`;
      }
      
      // Update individual product totals if provided
      if (data.products) {
        data.products.forEach(product => {
          // Find and update the corresponding product row
          const productRow = document.querySelector(`.price-item span:contains('${product.name}')`);
          if (productRow) {
            const priceElement = productRow.closest('.d-flex').querySelector('.price-values span');
            priceElement.textContent = `${product.itemTotal} ${data.currency}`;
          }
        });
      }
    }
  });