<template>
    <div :title="x+','+y" class="square" @click="handleClick">
        <div :class="state"></div>
    </div>    
</template>

<script>
export default {
    props: {x: Number, y: Number, state: String},
    methods: {
        handleClick () {
            this.$emit('handleSquareClick',this.x,this.y)
        }
    }
}
</script>

<style scoped>
    .square {
        display: inline-block;
        border-left: 1px solid black;
        border-top: 1px solid black;
        width: 25px;
        height: 25px;
        padding: 2px;
    }
    .square div{
        width: 100%;
        height: 100%;
        border-radius: 100%;
    }
    .black {
        background-color: black;
    }
    .white {
        background-color: whitesmoke;
    }

</style>