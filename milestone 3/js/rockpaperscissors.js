var ties=new Number(0);
var wins=new Number(0);
var loses=new Number(0);
var audio = new Audio('media/whistle.mp3');


function playGame (){
    audio.play();
    
    setTimeout(rock, 1000) 
    setTimeout(paper, 2000) 
    setTimeout(scissors, 3000)
    setTimeout(choose, 4000)
    setTimeout(winner,5000) 
    
    function rock() {
        document.getElementById("computer").src="media/rock.png";
        document.getElementById("player").src="media/rockplayer.png";
    }
    function paper() {
        document.getElementById("computer").src="media/paper.png";
        document.getElementById("player").src="media/paperplayer.png";
    }
    function scissors() {
        document.getElementById("computer").src="media/scissors.png";
        document.getElementById("player").src="media/scissorsplayer.png";
    }

    function choose(){
        computerPlay ="";
        myPlay="";
        computer=Math.floor(Math.random() * 3);
        console.log(computer);
        switch(computer) {
            case 0:
                document.getElementById("computer").src="media/rock.png";
                computerPlay ="rock";
                break;
            case 1:
                document.getElementById("computer").src="media/paper.png";
                computerPlay ="paper";
                break;
            case 2:
                document.getElementById("computer").src="media/scissors.png";
                computerPlay ="scissors";
                break;

        } 

        var player ="";
        player=document.getElementById("hands").value;

            switch(player){
                case "rock":
                    document.getElementById("player").src="media/rockplayer.png";
                    myPlay="rock";
                    break;
                case "paper":
                    document.getElementById("player").src="media/paperplayer.png";
                    myPlay= "paper";
                    break;
            
                case "scissors":
                    document.getElementById("player").src="media/scissorsplayer.png";
                    myPlay="scissors"
                    break;
            }

    }

    function winner(){
        result="lose";

        if (computerPlay==myPlay){
            result ="tie";
            ties ++;
        }
        if(computerPlay=="rock" && myPlay =="paper"){
            result="win";
            wins++
        }
        if(computerPlay=="paper" && myPlay =="scissors"){
            result="win";
            wins++
        }
    
        if(computerPlay=="scissors" && myPlay =="rock"){
            result="win";
            wins++
        }

        if(result =="lose"){
            loses++
        }

        document.getElementById("wins").textContent="WIN: " + wins;
        document.getElementById("loses").textContent="LOSE: " + loses;
        document.getElementById("ties").textContent="TIE: " + ties;

        console.log("you:" +myPlay);
        console.log("computer:" +computerPlay);
        console.log(result)
        console.log("wins"+wins)
        console.log("ties"+ties)
        console.log("loses"+loses)
    }
   

}
    