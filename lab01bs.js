document.addEventListener('DOMContentLoaded', function() {
    const userBoard = document.getElementById('user-board');
    const pcBoard = document.getElementById('pc-board');
    const message = document.getElementById('message');
    const hitsCount = document.getElementById('hits-count');
    const missesCount = document.getElementById('misses-count');
    const newGameBtn = document.getElementById('new-game-btn');
    const pmissesCount = document.getElementById('pmisses-count');
    const phitsCount = document.getElementById('phits-count');
    const hitSound = new Audio('sounddrake.m4a');
//initialising
    let userHits = 0;
    let userMisses = 0;
    let pcHits = 0;
    let pcMisses = 0;
    let pcShipCells = generateRandomNumbers();
    let userShipCells = generateRandomNumbers();

    //generates random numbers for the ships
    function generateRandomNumbers() {
        const randomNumbers = [];
        while (randomNumbers.length < 17) {
            const randomNumber = Math.floor(Math.random() * 99) + 1;
            if (!randomNumbers.includes(randomNumber)) {
                randomNumbers.push(randomNumber);
            }
        }
        return randomNumbers;
    }


    initializeuBoard(userBoard);
    initializepBoard(pcBoard, pcShipCells);

   
    addDragDropListeners();

    //event listeners for the clicks
    userBoard.addEventListener('click', handleUserClick);
    function initializeuBoard(board) {
        for (let i = 0; i < 100; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            board.appendChild(cell);
    
        }
    }

    //initializing boards- by adding the cells and ships from placement
    function initializepBoard(board, shipCells) {
        for (let i = 0; i < 100; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (shipCells.includes(i)) {
                cell.classList.add('ship');
                cell.setAttribute('draggable', 'true');
            }
    
            board.appendChild(cell);
        }
    }

    //handles functionality of the user clicks and checks if hit or miss.
    function handleUserClick(event) {
        const cell = event.target;

        //verifies if click is a valid move or not
        if (!cell.classList.contains('cell')) {
            message.textContent = 'Invalid move!';
            return;
        };

        //draggable content
        const shipCells = document.querySelectorAll('.ship');
        shipCells.forEach(cell => {
            cell.removeAttribute('draggable');
        });

        //checks if the click is in the ship array initialized before
        const isShipCell = userShipCells.includes(Array.from(cell.parentElement.children).indexOf(cell));
        const isitHit = isShipCell; 
        if (isitHit) {
            cell.classList.add('hit');
            cell.classList.remove('cell');
            userHits++;
            hitsCount.textContent = userHits;
            message.textContent = 'It\'s a hit!';
            hitSound.play();
        } else {
            cell.classList.add('miss');
            cell.classList.remove('cell');
            userMisses++;
            missesCount.textContent = userMisses;
            message.textContent = 'It\'s a miss!';
            userBoard.removeEventListener('click', handleUserClick);
            pcBoard.addEventListener('click', handlePcClick);
            setTimeout(handlePcClick, 1500);
            
        }
        if (userHits === 17) { 
            message.textContent = 'You win!';
            showModal('Congrats! You win:) YOU SLAYED!');
            disableUserBoard();
            pcBoard.removeEventListener('click', handlePcClick);
           
        }

    }


    function disableUserBoard() {
        userBoard.removeEventListener('click', handleUserClick);
    }

    //handles functionality of the pc side 
    function handlePcClick() {
        //console.log('PC clicked a cell');
        const randomCellIndex = Math.floor(Math.random() * pcBoard.children.length);
        const randomCell = pcBoard.children[randomCellIndex];
        //console.log('Selected cell index:', randomCellIndex);
        //console.log('Selected cell:', randomCell);
        if (!randomCell.classList.contains('cell')) {
            handlePcClick();
            return
        };

        //checks if the ship is clicked or not
        if (randomCell.classList.contains('ship')) {
            randomCell.classList.add('hit');
            randomCell.classList.remove('cell');
            message.textContent = 'PC got a hit!';
            pcHits++
            phitsCount.textContent = pcHits;
            userBoard.removeEventListener('click', handleUserClick);
            pcBoard.addEventListener('click', handlePcClick);
            hitSound.play();
            setTimeout(handlePcClick,1500); 
        } else {
            randomCell.classList.add('miss');
            randomCell.classList.remove('cell');
            message.textContent = 'PC missed!';
            pcMisses++
            pmissesCount.textContent = userMisses;
            userBoard.addEventListener('click', handleUserClick);
            pcBoard.removeEventListener('click', handlePcClick);
        }
        if (pcHits === 17) { 
            message.textContent = 'PC wins!';
            disableUserBoard();
            pcBoard.removeEventListener('click', handlePcClick);
            showModal('Oops! take the L- the PC wins:( BETTER LUCK NEXT TIME GIRL!');
        }
    }

    //show the start screen pop up message before game is started
    function showRulesModal() {
        const rulesModal = document.getElementById('rules-modal');
        rulesModal.style.display = 'block';
    }
        
    window.addEventListener('load', showRulesModal);

    //new game button to clear everything from the games to start fresh
    newGameBtn.addEventListener('click', function() {
        resetGame();
        message.textContent = 'New game!';
        showRulesModal();
    });

   //resets cells and scores
    function resetGame() {
        disableUserBoard
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
        clearBoard(pcBoard, pcShipCells);
        pcShipCells = generateRandomNumbers();
        userShipCells = generateRandomNumbers();
        initializepBoard(pcBoard, pcShipCells);
        initializeuBoard(userBoard);
        addDragDropListeners();
        //cell.setAttribute('draggable', 'true');
    }
    
    // helper function to clear
    function clearBoard(board) {
        board.innerHTML = '';
    }

    //drag and drop functionality
    function addDragDropListeners() {
        let items = document.querySelectorAll('.cell');
        items.forEach(function(item) {
          item.addEventListener('dragstart', handleDragStart, false);
          item.addEventListener('dragenter', handleDragEnter, false);
          item.addEventListener('dragover', handleDragOver, false);
          item.addEventListener('dragleave', handleDragLeave, false);
          item.addEventListener('drop', handleDrop, false);
          item.addEventListener('dragend', handleDragEnd, false);
        });
    }
    var dragSrcEl = null;
  
    function handleDragStart(e) {
      this.style.opacity = '0.4';
      dragSrcEl = this;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.innerHTML);
    }
  
    function handleDragOver(e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
      e.dataTransfer.dropEffect = 'move';
      return false;
    }
  
    function handleDragEnter(e) {
      this.classList.add('over');
    }
  
    function handleDragLeave(e) {
      this.classList.remove('over');
    }
  
    function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation(); 
        }
        if (dragSrcEl != this) {
            this.parentNode.insertBefore(dragSrcEl, this);
            dragSrcEl.parentNode.insertBefore(this, dragSrcEl);
            const sourceIndex = Array.from(pcBoard.children).indexOf(dragSrcEl);
            const targetIndex = Array.from(pcBoard.children).indexOf(this);
            const shipIndex = pcShipCells.indexOf(sourceIndex);
            pcShipCells[shipIndex] = targetIndex;
        }
        return false;
    }
  
    function handleDragEnd(e) {
      this.style.opacity = '1';
      
      items.forEach(function (item) {
        item.classList.remove('over');
      });
    }
    
    function enableUserBoard() {
        userBoard.addEventListener('click', handleUserClick);
    }

    //shows pop up
    function showModal(message) {
        const modal = document.getElementById('modal');
        const modalMessage = document.getElementById('modal-message');
        modalMessage.textContent = message;
        modal.style.display = 'block';
      }  
});

//functions to close the 2 popups
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

function closenModal() {
    const modal = document.getElementById('rules-modal');
    modal.style.display = 'none';
}
  


  //comments
  //submit