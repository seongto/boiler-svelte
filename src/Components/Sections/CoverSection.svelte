<script>
    import * as constants   from '../../assets/js/constants.js';
    import { onMount, onDestroy }      from 'svelte';
    import { fly }   from 'svelte/transition';
    import TextBox          from '../TextBox.svelte';
    import Seperator        from '../Seperator.svelte';

    export let imgWidth;
    
    let timer = 4;
    let currentIndex = 0;

    let coverArray = [
        {
            "titleBold" : "나의 브랜드로 \n만드는 기회",
            "titleThin" : "나를 브랜딩하고, \n새로운 프로젝트를 발견하세요.",
            "imgUrl" : "/static-images/landing-01.jpg", 
        },{
            "titleBold" : "나의 브랜드로 \n만드는 기회",
            "titleThin" : "나를 브랜딩하고, \n새로운 프로젝트를 발견하세요.",
            "imgUrl" : "/static-images/landing-02.jpg", 
        }
    ]

    let startInterval = setInterval(function(){
        currentIndex++;
        if (currentIndex >= coverArray.length){
            currentIndex = 0;
        }
    }, timer*1000);

    onDestroy(() => {
        clearInterval(startInterval);
    })
    
</script>

<div class="cover-wrapper">
    {#each coverArray as item, idx}
        {#if currentIndex === idx}
            <div class="title" style="height:{imgWidth};">
                <TextBox 
                    tagType="h1" 
                    className="cover-title-bold" 
                    context={item["titleBold"]} 
                />
                <Seperator borderWidth=0 paddingTop=6 paddingBottom=6 />
                <TextBox
                    className="cover-title-thin"
                    context={item["titleThin"]} 
                />
            </div>
            <img alt="cover-image" width={imgWidth} height={imgWidth} src="{constants.IMG_URL}{item["imgUrl"]}" in:fly="{{ duration:2400, x:12, opacity:0.7}}">
        {/if}
    {/each}
</div>

<style lang="scss">
    @import '../../assets/scss/common.scss';

    .cover-wrapper {
        display: flex;
        justify-content: space-between;
        padding-top: 100px;

        @include respond-to('w600') {
            justify-content: left;
            flex-direction: column;
        }

        .title {
            font-family: $font-kr;
            align-self : center;
            

            @include respond-to('w600') {
                align-self: auto;
                padding: 30px 0;
            }

            :global(h1.cover-title-bold) {
                width: 100%;
                font-size: 2em;
                font-weight: 700;
                display: block;
                line-height: 1.2em;
                color: $sub-color1;
                margin-bottom: 0;
            }

            :global(p.cover-title-thin) {
                font-size: 0.9em;
                color: $theme-color1;
                border: none;
                display: block;
            }
        }

        img {
            border-radius: 8px;

            @include respond-to('w600') {
                margin-top: 20px;
                width: 100%;
                height: 100%;
                border-radius: 4px;
            }
        }
    }
</style>