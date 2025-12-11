// Store paddle position for ball to return to
let paddleX = 0;
let paddleY = 0;
let isMoving = false;

// Position ball on paddle initially
const positionBallOnPaddle = () => {
  const ball = document.getElementById('ball');
  const paddle = document.getElementById('paddle');
  const container = document.getElementById('ballContainer');
  
  if (ball && paddle && container) {
    const containerRect = container.getBoundingClientRect();
    const paddleRect = paddle.getBoundingClientRect();
    
    // Calculate paddle head (拍面) center position relative to container
    // Paddle head is at the top of the paddle, centered horizontally
    paddleX = paddleRect.left - containerRect.left + paddleRect.width / 2;
    // Paddle head top position (15px is the height of paddle-head)
    paddleY = paddleRect.top - containerRect.top;
    
    // Position ball on paddle head (拍面) - centered horizontally, on top of the paddle head
    const ballSize = 20;
    ball.style.left = `${paddleX - ballSize / 2}px`;
    ball.style.top = `${paddleY - ballSize}px`; // Position ball on top of paddle head
  }
};

// Move ball to random position and return to paddle
const moveBall = () => {
  if (isMoving) return; // Prevent multiple clicks during animation
  
  const ball = document.getElementById('ball');
  const container = document.getElementById('ballContainer');
  
  if (ball && container) {
    isMoving = true;
    
    // Get container dimensions
    const containerRect = container.getBoundingClientRect();
    const ballSize = 20;
    
    // Calculate random position within container bounds
    const maxX = containerRect.width - ballSize;
    const maxY = containerRect.height - ballSize - 100; // Leave space for paddle
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    // Move ball to random position
    ball.style.left = `${randomX}px`;
    ball.style.top = `${randomY}px`;
    ball.classList.add('moving');
    
    // Return ball to paddle after 1 second
    setTimeout(() => {
      ball.style.left = `${paddleX - ballSize / 2}px`;
      ball.style.top = `${paddleY - ballSize}px`; // Return to paddle head position
      
      // Remove moving class and reset after animation
      setTimeout(() => {
        ball.classList.remove('moving');
        isMoving = false;
      }, 500);
    }, 1000);
  }
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  // Position ball on paddle initially (with small delay to ensure DOM is ready)
  setTimeout(() => {
    positionBallOnPaddle();
  }, 100);
  
  // Reposition on window resize
  window.addEventListener('resize', () => {
    setTimeout(() => {
      positionBallOnPaddle();
    }, 100);
  });
  
  // Set up ball click event (demonstrates event handling and DOM manipulation)
  const ball = document.getElementById('ball');
  if (ball) {
    ball.addEventListener('click', moveBall);
  }
});

// Export for testing
if (typeof module !== 'undefined') {
  module.exports = {
    moveBall
  };
}
