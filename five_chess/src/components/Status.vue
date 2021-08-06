<template>
    <div>第{{step}}步, 现在是{{activePlayer.chName}}方执棋</div>    
</template>

<script>
export default {
    props: {
        step: Number,
        activePlayer: Object    
    }
}
</script>