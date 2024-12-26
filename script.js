document.addEventListener('DOMContentLoaded', function() {
    

       let ball = document.getElementById('ball'); // Targeting the ball
        let table = document.getElementById('ping-pong-table'); // Targeting the ping pong table
        let leftPaddle = document.getElementById('left-paddle'); // Targeting the left paddle
        let rightPaddle = document.getElementById('right-paddle'); // Targeting the right paddle
        let player1 = document.getElementById('player1score'); // Targeting the player 1 score
        let player2 = document.getElementById('player2score'); // Targeting the player 2 score
        let resetButton = document.getElementById('reset-btn'); // Targeting the reset button

        let ballX = 50; // distance of top of the ball w.r.t ping pong table
        let ballY = 50; // distance of left of the ball w.r.t ping pong table

        let dx = 2; // displacement of ball in x direction, 2 -> you will displace by 2px in +x direction, -2 -> you will displace by 2px in -x direction
        let dy = 2;// displacement of ball in x direction, 2 -> you will displace by 2px in +x direction, -2 -> you will displace by 2px in -x direction
        

        ball.style.left = `${ballX}px`;
        ball.style.top = `${ballY}px`;



    let leftPaddleY = 0;
    let dPy = 10; // displacement of paddle in y direction
    let rightPaddleY = 0;
    let dPRy = 10; // displacement of paddle in y direction

      // Event listeners for keyboard
        document.addEventListener('keydown', function(e) {
            if(e.key === "w" && leftPaddleY > 0) {
            // w key
            leftPaddleY += (-1) * dPy;
        
            } else if(e.key === "s" && leftPaddleY < table.offsetHeight - leftPaddle.offsetHeight) {
            // s key
            leftPaddleY += dPy;
            }
            leftPaddle.style.top = `${leftPaddleY}px`;

            if(e.keyCode == 38 && rightPaddleY > 0) {
            // up arrow key
            rightPaddleY += (-1) * dPRy;
        
            } else if(e.keyCode == 40 && rightPaddleY < table.offsetHeight - rightPaddle.offsetHeight) {
            // down arrow key
            rightPaddleY += dPRy;
            }
            rightPaddle.style.top = `${rightPaddleY}px`;
        });

        // Event listeners for mobile devices
        let touchStartY = 0;
        let touchEndY = 0;


        // combined event listener for both paddles
        table.addEventListener('touchstart', function(e) {
            e.preventDefault();
            touchStartY = e.touches[0].clientY;
        });

        table.addEventListener('touchmove', function(e) {
            e.preventDefault();
            touchEndY = e.touches[0].clientY;
            let touchDiff = touchEndY - touchStartY;

            if (e.touches[0].clientX < table.offsetWidth / 2) {
                // left paddle
                if (touchDiff < 0 && leftPaddleY > 0) {
                    // swipe up
                    leftPaddleY += (-1) * dPy;
                } else if (touchDiff > 0 && leftPaddleY < table.offsetHeight - leftPaddle.offsetHeight) {
                    // swipe down
                    leftPaddleY += dPy;
                }
                leftPaddle.style.top = `${leftPaddleY}px`;
            } else {
                // right paddle
                if (touchDiff < 0 && rightPaddleY > 0) {
                    // swipe up
                    rightPaddleY += (-1) * dPRy;
                } else if (touchDiff > 0 && rightPaddleY < table.offsetHeight - rightPaddle.offsetHeight) {
                    // swipe down
                    rightPaddleY += dPRy;
                }
                rightPaddle.style.top = `${rightPaddleY}px`;
            }
            touchStartY = touchEndY; // Update start position for continuous movement
        });


        // handle collision with walls
        // handle collision with paddles
        // handle scoring
        // handle winner





        // pause button

        let pauseButton = document.getElementById('pause-btn');
        let isPaused = false;

        function pause() {
            isPaused = !isPaused;
        }

        pauseButton.addEventListener('click', pause);

        setInterval(function() {
            if (!isPaused) {
                ballX += dx;
                ballY += dy;

                ball.style.left = `${ballX}px`;
                ball.style.top = `${ballY}px`;

                if (ballX > table.offsetWidth - ball.offsetWidth || ballX <= 0) {
                    dx *= -1;
                }

                if (ballY > table.offsetHeight - ball.offsetHeight || ballY <= 0) {
                    dy *= -1;
                }
            }
        }, 10);

        // Scoring 
        function score() {
            if (ballX <= leftPaddle.offsetWidth && ballY >= leftPaddleY && ballY <= leftPaddleY + leftPaddle.offsetHeight) {
            dx *= -1; // Ball hits the left paddle
            } else if (ballX >= table.offsetWidth - ball.offsetWidth - rightPaddle.offsetWidth && ballY >= rightPaddleY && ballY <= rightPaddleY + rightPaddle.offsetHeight) {
            dx *= -1; // Ball hits the right paddle
            } else if (ballX <= 0) {
            player2.innerHTML = parseInt(player2.innerHTML) + 1;
            resetBall();
            } else if (ballX >= table.offsetWidth - ball.offsetWidth) {
            player1.innerHTML = parseInt(player1.innerHTML) + 1;
            resetBall();
            }

            if (ballY <= 0 || ballY >= table.offsetHeight - ball.offsetHeight) {
            dy *= -1; // Ball hits the top or bottom wall
            }
        };

        function resetBall() {
            ballX = table.offsetWidth / 2 - ball.offsetWidth / 2;
            ballY = table.offsetHeight / 2 - ball.offsetHeight / 2;
            dx = -dx; // Change direction of the ball
            dy = -dy; // Change direction of the ball
        }

        // Reset button
        function reset() {
            console.log("reset btn clicked");
            player1.innerHTML = 0;
            player2.innerHTML = 0;
        };

        resetButton.addEventListener('click', reset);


        // Winner
        function winner() {
            if(player1.innerHTML == 5) {
                alert("Player 1 wins");
                player1.innerHTML = 0;
                player2.innerHTML = 0;
            } else if(player2.innerHTML == 5) {
                alert("Player 2 wins");
                player1.innerHTML = 0;
                player2.innerHTML = 0;
            } else {
                return;
            }
        }

  // Calling the functions
    setInterval(score, 1000);
    setInterval(winner, 1000);

    });