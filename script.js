document.addEventListener('DOMContentLoaded', function() {
    const userBoard = document.getElementById('user-board');
    const pcBoard = document.getElementById('pc-board');
    const message = document.getElementById('message');
    const hitsCount = document.getElementById('hits-count');
    const missesCount = document.getElementById('misses-count');
    const newGameBtn = document.getElementById('new-game-btn');
    const pmissesCount = document.getElementById('pmisses-count');
    const phitsCount = document.getElementById('phits-count');
    const hitSound = new Audio('sound.mp3');

    let userHits = 0;
    let userMisses = 0;
    let pcHits = 0;
    let pcMisses = 0;

    // Initialize game boards
    initializeBoard(userBoard);
    initializeBoard(pcBoard);

    // Add event listeners for user's board
    userBoard.addEventListener('click', handleUserClick);
   
  


    // Function to initialize game board
    function initializeBoard(board) {
        for (let i = 0; i < 100; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            board.appendChild(cell);
        }

        // Randomly select 17 cells to be ships
        const shipCells = [];
        while (shipCells.length < 17) {
        const randomIndex = Math.floor(Math.random() * 100); // Generate random index from 0 to 99
        if (!shipCells.includes(randomIndex)) {
            shipCells.push(randomIndex);
        }
    }

    // Mark ship cells with a 'ship' class
    shipCells.forEach(index => {
        const cell = board.children[index];
        cell.classList.add('ship');
    });
    }

    // Function to handle user click
    function handleUserClick(event) {
        const cell = event.target;
        if (!cell.classList.contains('cell')) {
            message.textContent = 'Invalid move!';
            return;
        };

        // Example logic for hit/miss
        const isHit = Math.random() < 0.5; // Random hit or miss
        if (isHit) {
            cell.classList.add('hit');
            userHits++;
            hitsCount.textContent = userHits;
            message.textContent = 'It\'s a hit!';
            hitSound.play();
        } else {
            cell.classList.add('miss');
            userMisses++;
            missesCount.textContent = userMisses;
            message.textContent = 'It\'s a miss!';
            userBoard.removeEventListener('click', handleUserClick);
            pcBoard.addEventListener('click', handlePcClick);
            setTimeout(handlePcClick, 1000);
            
        }
        

        // Check for game over
        if (userHits === 13) { // Assuming 17 hits sink all ships
            message.textContent = 'You win!';
            showModal('Congratulations! You win!');
            disableUserBoard();
            pcBoard.removeEventListener('click', handlePcClick);
        }

        

       
}

    // Function to disable user board after game over
    function disableUserBoard() {
        userBoard.removeEventListener('click', handleUserClick);
    }

    // Example logic for PC's turn
    function handlePcClick() {
            console.log('PC clicked a cell');
            // PC randomly selects a cell and triggers a click event
            const randomCellIndex = Math.floor(Math.random() * pcBoard.children.length);
            const randomCell = pcBoard.children[randomCellIndex];
            console.log('Selected cell index:', randomCellIndex);
            console.log('Selected cell:', randomCell);
        
            // Example logic to determine hit or miss
            const isHit = Math.random() < 0.5; // Random hit or miss
            console.log('Is hit:', isHit);
            if (isHit) {
                randomCell.classList.add('hit');
                message.textContent = 'PC got a hit!';
                pcHits++
                phitsCount.textContent = pcHits;
                userBoard.removeEventListener('click', handleUserClick);
                pcBoard.addEventListener('click', handlePcClick);
                hitSound.play();
                setTimeout(handlePcClick,1000); 

            } else {
                randomCell.classList.add('miss');
                message.textContent = 'PC missed!';
                pcMisses++
                pmissesCount.textContent = userMisses;
                userBoard.addEventListener('click', handleUserClick);
                pcBoard.removeEventListener('click', handlePcClick);
            }
            if (pcHits === 13) { // Assuming 17 hits sink all ships
                message.textContent = 'PC wins!';
                disableUserBoard();
                pcBoard.removeEventListener('click', handlePcClick);
                showModal('Game over! PC wins!');
            }
        
            
        }
    
    // Event listener for new game button
    newGameBtn.addEventListener('click', function() {
        resetGame();
        message.textContent = 'New game started!';
    });

   // resents game
    function resetGame() {
        userHits = 0;
        userMisses = 0;
        pcHits = 0;
        pcMisses = 0;
        phitsCount.textContent = pcHits;
        pmissesCount.textContent = pcMisses;
        hitsCount.textContent = userHits;
        missesCount.textContent = userMisses;
        message.textContent = '';
        enableUserBoard();
        clearBoard(userBoard);
        clearBoard(pcBoard);
    }
    
    // Function to clear the board
    function clearBoard(board) {
        const cells = board.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.classList.remove('hit', 'miss');
        });
    }

    // Function to enable user board
    function enableUserBoard() {
        userBoard.addEventListener('click', handleUserClick);
    }

    function showModal(message) {
        const modal = document.getElementById('modal');
        const modalMessage = document.getElementById('modal-message');
        modalMessage.textContent = message;
        modal.style.display = 'block';
        
      }
      
      // Function to close the modal
      //function closeModal() {
     //   document.getElementById('modal').style.display = 'none';
      //}
});




//it is randomized so slay
//sound effects??
//


  
  // Function to close the modal
  function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
  }