var game = 
{
    dy: [-1,1,0,0],
    dx: [0,0,-1,1],
    data: [],
    score: 0,
    status: true,
    init: function()
    {
        this.status = true;
        this.score = 0;
        this.data = 
        [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ]
        this.generate();
        this.generate();
    },
    generate: function()
    {
        while (1)
        {
            var r = Math.floor(Math.random()*4);
            var c = Math.floor(Math.random()*4);
            var v = Math.random() > 0.1 ? 2 : 4;
            if (this.data[r][c] == 0)
            {
                this.data[r][c] = v;
                break;
            }
        }
        this.update();
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
    isGameover: function()
    {
        for (var r = 0;r < 4;r ++)
            for (var c = 0;c < 4;c ++)
                if (this.data[r][c] == 0) return false;
        for (var r = 0;r < 3;r ++)
            for (var c = 0;c < 3;c ++)
                if (this.data[r][c] == this.data[r][c + 1] || this.data[r][c] == this.data[r + 1][c]) return false;
        for (var i = 0;i < 3;i ++)
            if (this.data[3][i] == this.data[3][i + 1] || this.data[i][3] == this.data[i + 1][3]) return false;
        return true;
    },
    next: function(r, c, d)
    {
        var i = 0;
        while (r < 4 && c < 4 && r > -1 && c > -1)
        {
            if (this.data[r][c] != 0) return i;
            r += this.dx[d], c += this.dy[d];
            i ++;
        }
        return -1;
    },
    moveLeft: function() 
    {

        var isMoved = false;
        for (var r = 0;r < 4;r ++)
        {
            for (var c = 0;c < 3;c ++)
            {
                var delta = this.next(r, c + 1, 1);
                var next_c = c + 1 + delta;
                if (delta != -1)
                {
                    if (this.data[r][c] == 0)
                    {
                        this.data[r][c] = this.data[r][next_c];
                        this.data[r][next_c] = 0;
                        isMoved = true;
                        c --; //还没有合并
                    }
                    else if (this.data[r][c] == this.data[r][next_c])
                    {
                        this.data[r][c] += this.data[r][next_c];
                        this.data[r][next_c] = 0;
                        this.score += this.data[r][c];
                        isMoved = true;
                    }
                }
                else 
                {
                    break;
                }
            }
        }
        if (isMoved)
        {
            this.generate();
            if (this.isGameover()) this.status = false;
        }
        this.update();
    },
    moveRight: function() 
    {

        var isMoved = false;
        for (var r = 0;r < 4;r ++)
        {
            for (var c = 3;c > 0;c --)
            {
                var delta = this.next(r, c - 1, 0);
                var next_c = c - 1 - delta;
                if (delta != -1)
                {
                    if (this.data[r][c] == 0)
                    {
                        this.data[r][c] = this.data[r][next_c];
                        this.data[r][next_c] = 0;
                        isMoved = true;
                        c ++; //还没有合并
                    }
                    else if (this.data[r][c] == this.data[r][next_c])
                    {
                        this.data[r][c] += this.data[r][next_c];
                        this.data[r][next_c] = 0;
                        this.score += this.data[r][c];
                        isMoved = true;
                    }
                }
                else 
                {
                    break;
                }
            }
        }
        if (isMoved)
        {
            this.generate();
            if (this.isGameover()) this.status = false;
        }
        this.update();
    },
    moveUp: function()
    {
        var isMoved = false;
        for (var c = 0;c < 4;c ++)
        {
            for (var r = 0;r < 3;r ++)
            {
                var delta = this.next(r + 1, c, 3);
                var next_r = r + 1 + delta;
                if (delta != -1)
                {
                    if (this.data[r][c] == 0)
                    {
                        this.data[r][c] = this.data[next_r][c];
                        this.data[next_r][c] = 0;
                        isMoved = true;
                        r --; //还没有合并
                    }
                    else if (this.data[r][c] == this.data[next_r][c])
                    {
                        this.data[r][c] += this.data[next_r][c];
                        this.data[next_r][c] = 0;
                        this.score += this.data[r][c];
                        isMoved = true;
                    }
                }
                else 
                {
                    break;
                }
            }
        }
        if (isMoved)
        {
            this.generate();
            if (this.isGameover()) this.status = false;
        }
        this.update();
    },
    moveDown: function()
    {
        var isMoved = false;
        for (var c = 0;c < 4;c ++)
        {
            for (var r = 3;r > 0;r --)
            {
                var delta = this.next(r - 1, c, 2);
                var next_r = r -1 - delta;
                if (delta != -1)
                {
                    if (this.data[r][c] == 0)
                    {
                        this.data[r][c] = this.data[next_r][c];
                        this.data[next_r][c] = 0;
                        isMoved = true;
                        r ++; //还没有合并
                    }
                    else if (this.data[r][c] == this.data[next_r][c])
                    {
                        this.data[r][c] += this.data[next_r][c];
                        this.data[next_r][c] = 0;
                        this.score += this.data[r][c];
                        isMoved = true;
                    }
                }
                else 
                {
                    break;
                }
            }
        }
        if (isMoved)
        {
            this.generate();
            if (this.isGameover()) this.status = false;
        }
        this.update();
    }     
}
game.init();
document.onkeydown=function(event)
{
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 37)
    {
        game.moveLeft(); 
    }
    if (e && e.keyCode == 38)
    {
        game.moveUp();
    }
    if (e && e.keyCode == 39)
    {
        game.moveRight();
    }
    if (e && e.keyCode == 40)
    {
        game.moveDown();
    }

}; 
