var game = 
{
    data: [],
    score: 0,
    status: true,
    init: function()
    {
        this.status = true;
        this.score = 0;
        game.data = 
        [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ]
        this.generate();
        this.generate();
        this.update();
    },
    generate: function()
    {
        while (1)
        {
            var r = Math.floor(Math.random()*4);
            var c = Math.floor(Math.random()*4);
            var v = Math.random() > 0.5 ? 2 : 4;
            if (this.data[r][c] == 0)
            {
                this.data[r][c] = v;
                break;
            }
        }
    },
    update: function()
    {
        for (var r = 0;r < 4;r ++)
        {
            for (var c = 0;c < 4;c ++)
            {
                var div = document.getElementById("c" + r + c);
                if (this.data[r][c])
                {
                    div.innerHTML = this.data[r][c];
                    div.className = "cell" + " "+ "n" + this.data[r][c];
                }
                else
                {
                    div.innerHTML = "";
                    div.className = "cell";
                }
            }
        }
        document.getElementById("score_01").innerText = this.score;
        if (this.status == false)
        {
            document.getElementById("gameover").style.display = "block";
            document.getElementById("score_02").innerText = this.score;
        }
        else
        {
            document.getElementById("gameover").style.display = "none";
        }
    },
}
game.init();