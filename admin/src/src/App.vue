<template>
    <div id="app">
        <keep-alive>
            <router-view class="router-view"></router-view>
            <router-view class="login-view" name="login"></router-view>
        </keep-alive>
    </div>
</template>
