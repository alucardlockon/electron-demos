<template>
    <div class="board">
        <div class="row" v-for="row of squares" :key="row.index">
            <square v-for="sq of row" :key="sq.x+'_'+sq.y" :x="sq.x" :y="sq.y"
            :state="sq.state"
            @handleSquareClick="handleSquareClick"></square>
        </div>
    </div>
</template>

<script>
import Square from './Square.vue'
export default {
    components: {Square},
    props: {
        squares: Array
    },
    methods: {
        handleSquareClick (x,y) {
            this.$emit('handleSquareClick',x,y)
        }
    }
}
</script>

<style>
    .board {
        margin: 5px;
        border-right: 1px solid black;
        border-bottom: 1px solid black;
        width: 450px;
        height: 450px;
        background-color: rgb(235, 185, 48);
    }
    .row {
        height: 30px;
    }
</style>