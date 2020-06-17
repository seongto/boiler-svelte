<script context="module">
    const importScript = src => {
        return new Promise((resolve, reject) => {
            let s = document.createElement('script')
            s.addEventListener('load', resolve)
            s.type = 'text/javascript'
            s.charset = 'utf-8'
            s.src = src
            let x = document.getElementsByTagName('script')[0]
            if (x.parentNode) x.parentNode.insertBefore(s, x)
        })
    }

    const importStyle = href => {
        return new Promise((resolve, reject) => {
            let s = document.createElement('link')
            s.addEventListener('load', resolve)
            s.rel = 'stylesheet'
            s.type = 'text/css'
            s.href = href
            let x = document.getElementsByTagName('link')[0]
            if (x.parentNode) x.parentNode.insertBefore(s, x)
        })
    }

    // Script 와 Style 을 추가합니다.
    const loadResources = async () => {
        await Promise.all([
            importScript('https://unpkg.com/swiper/js/swiper.min.js'),
            importStyle('https://unpkg.com/swiper/css/swiper.min.css'),
        ])
        isResourceLoadedStore.set(true)
    }
    loadResources()

    import { writable } from 'svelte/store'
    let isResourceLoadedStore = writable(false)
</script>

<script lang="typescript">
    // @ts-ignore
    import * as Utils from '../utils'
    import { Writable } from 'svelte/store'
    declare var window: any
    declare var isResourceLoadedStore: any

    export let element = undefined
    export let swiper = undefined
    export let settings = {}
    export let usePagination = false
    export let useNextButton = false
    export let usePrevButton = false

    // CSS Style
    export let style = {
        container: {},
        wrapper: {},
        nextButton: {},
        prevButton: {},
    }

    // CSS Theme
    export let theme = {
        container: {},
        wrapper: {},
        nextButton: {},
        prevButton: {},
    }

    import { makeCSS } from 'svelte-css-in-js'
    const css = makeCSS({ style, theme })

    Utils.Svelte.onMount(() => {
        // 만약 이미 리소스들이 로딩되었다면
        // (컴포넌트가 여러번 사용되는 중이라면)
        // 바로 렌더링 함수를 호출합니다.
        if (Utils.Store.get(isResourceLoadedStore)) {
            render()
        } else {
            let unsubscribe = isResourceLoadedStore.subscribe(
                isResourceLoaded => {
                    if (isResourceLoaded) {
                        render()
                        unsubscribe()
                    }
                }
            )
        }
    })

    const render = async () => {
        if (useNextButton && !usePrevButton)
            settings = {
                ...settings,
                navigation: {
                    nextEl: '.swiper-button-next',
                },
            }
        if (usePrevButton && !useNextButton)
            settings = {
                ...settings,
                navigation: {
                    prevEl: '.swiper-button-prev',
                },
            }
        if (useNextButton && usePrevButton)
            settings = {
                ...settings,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            }
        console.log(settings)
        swiper = new window.Swiper(element, settings)
    }
    Utils.Svelte.onDestroy(() => {
        if (swiper && swiper.destroy) swiper.destroy()
    })
</script>

<!-- Swiper -->
<div class="swiper-container {css.container}" bind:this={element}>
    <div class="swiper-wrapper {css.wrapper}">
        <slot />
    </div>
    <!-- Add Arrows -->
    {#if useNextButton}
        <div class="swiper-button-next {css.nextButton}" />
    {/if}
    {#if usePrevButton}
        <div class="swiper-button-prev {css.prevButton}" />
    {/if}
</div>

<!-- Add Pagination -->
{#if usePagination}
    <div class="swiper-pagination" />
{/if}

<style>
    .swiper-container {
        position: relative;
        width: 100%;
        height: calc(100% - 30px);
    }
    .swiper-pagination {
        width: 100%;
        height: 30px;
        margin-left: auto;
        margin-right: auto;
        padding-top: 5px;
    }
</style>
