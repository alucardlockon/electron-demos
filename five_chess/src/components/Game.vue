<template>
	<div>
    <game-ui @handleRestartGame="handleRestartGame"
		></game-ui>
    <board
      :squares="boardSquares"
			@handleSquareClick="handleSquareClick"
    ></board>
    <status :step="step" :activePlayer="activePlayer"></status>
  </div>
</template>

<script>
import _ from 'lodash'
import GameUi from './GameUi.vue'
import Board from './Board.vue'
import Status from './Status.vue'
export default {
  components: { GameUi, Board, Status },
    data() {
        return {
            // 当前状态
            status: 'playing',
            // 当前步数
            step: 1,
            // 棋盘, 格子有三个状态: 黑子black，白子white，空白blank
            boardSquares: _.times(15, y=> _.times(15, x=> {return {x,y,state:'blank'}})),
            // 两个操作者
            players: [
                {name:'black', chName: '黑', state: 'active'},
                {name: 'white', chName: '白', state: 'wait'}
                ] 
        }
    },
    methods: {
        getActivePlayer() {return _.find(this.players, {state:'active'})},
        getWaitPlayer() {return _.find(this.players, {state:'wait'})},
        changePlayer() {
            const active = this.getActivePlayer()
            const wait = this.getWaitPlayer()
            active.state='wait'
            wait.state='active'
        },
				// 重新开始游戏
        handleRestartGame() {
            this.status = 'playing'
            this.step= 1
            // this.boardSquares= _.times(15, y=> _.times(15, x=> {return {x,y,state:'blank'}}))
            _(this.boardSquares).flatten().forEach(it=>it.state='blank')
            if(this.getActivePlayer().name!=='black')
                this.changePlayer() 

        }
				,// 检查游戏是否结束
        checkGameEnd(x, y) {
            const square= this.boardSquares[y][x]
            const squareState = square.state
            let link = 0
            // 判断横向
            for(let i=(x-4>0?x-4:0);i<=(x+4<15?x+4:14);i++){
                let currentSquare = this.boardSquares[y][i];
                if(currentSquare.state === squareState){
                    link++
                    if(link>=5) return true
                }else{
                    link=0
                }
            }
            link=0
            // 纵向
            for(let i=(y-4>0?y-4:0);i<=(y+4<15?y+4:14);i++){
                let currentSquare = this.boardSquares[i][x];
                if(currentSquare.state === squareState){
                    link++
                    if(link>=5) return true
                }else{
                    link=0
                }
            }
            link=0
            // 斜上
            for(let i=(x-4>0?x-4:0);i<=(x+4<15?x+4:14);i++){
                const currentY = y-(i-x); 
                if(currentY>=0 && currentY<=14){
                    console.log(i, currentY)
                    let currentSquare = this.boardSquares[currentY][i];
                    if(currentSquare.state === squareState){
                        link++
                        if(link>=5) return true
                    }else{
                        link=0
                    }
                }else{
                    link =0
                }
            }
            link=0
            // 斜下
            for(let i=(x-4>0?x-4:0);i<=(x+4<15?x+4:14);i++){
                const currentY = y-(x-i); 
                if(currentY>=0 && currentY<=14){
                    console.log(i, currentY)
                    let currentSquare = this.boardSquares[currentY][i];
                    if(currentSquare.state === squareState){
                        link++
                        if(link>=5) return true
                    }else{
                        link=0
                    }
                }else{
                    link =0
                }
            }

            return false
        },
				handleSquareClick(x, y) {
            if(this.status==='end'){
                alert('游戏已经结束，请重新开始')
                return;
            }
            const square= this.boardSquares[y][x]
            if(square.state!=='blank') return
            square.state=this.getActivePlayer().name
            if(this.checkGameEnd(x, y)){
                this.status='end'
                alert('游戏结束')
            }else{
                this.step ++
                this.changePlayer()
            }
        },
  },
	computed: {
			activePlayer() {
					return this.getActivePlayer()
			}
	}
}
</script>

<style>

</style>