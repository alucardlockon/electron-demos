<template>
	<el-row>
        <el-button-group>
            <el-button type="primary" @click="handleRestartGame">重新开始</el-button>
        </el-button-group>
    </el-row>
</template>

<script>
export default {
	methods: {
        handleRestartGame() {
            this.$emit('handleRestartGame') 
        }
    }
}
</script>

<style>

</style>