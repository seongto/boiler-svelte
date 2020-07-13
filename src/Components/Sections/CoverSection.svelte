<script>
    import * as constants   from '../../assets/js/constants.js';
    import { onMount, onDestroy, tick }      from 'svelte';
    import { fly }          from 'svelte/transition';
    import TextBox          from '../TextBox.svelte';
    import Seperator        from '../Seperator.svelte';

    export let imgWidth;
    export let loginCheck;
    
    let timer = 4;
    let currentIndex = 0;
    let winWidth = window.innerWidth;
    let coverList;
    let coverWidth;
    let startInterval;

    let coverArray = [
        {
            "title-bold" : "나의 브랜드로 \n만드는 기회",
            "title-thin" : "나를 브랜딩하고, \n새로운 프로젝트를 발견하세요.",
            "img-url" : "/static-images/landing-01.jpg",
            "link-text" : "🏃💨 해보겠습니다 (클릭!)",
            "link-url1" : "https://allius.io/desk",
            "link-url2" : "https://allius.io/login",
        },{
            "title-bold" : "나의 브랜드로 \n만드는 기회",
            "title-thin" : "나를 브랜딩하고, \n새로운 프로젝트를 발견하세요.",
            "img-url" : "/static-images/landing-02.jpg",
            "link-text" : "🏃💨 해보겠습니다 (클릭!)",
            "link-url1" : "https://allius.io/desk",
            "link-url2" : "https://allius.io/login",
        }
    ]
    /*
    const setScrollAnimation = (target, x, y, dur) =>{
        let frame = (dur/1000)*60;
        console.log(frame);

        let moveStart = setInterval(()=>{
            let currentX = target.scrollLeft;
            let currentY = target.scrollTop;

            target.scrollTo(currentX + (x/frame), currentY + (y/frame));
            console.log("11");
        }, 1000/60);

        let globalCool = setTimeout(()=>{
            clearInterval(moveStart);
        }, dur);
    }
    */

   onMount(()=>{
        startInterval = setInterval(()=>{
           currentIndex++;
           if (currentIndex >= coverArray.length) {currentIndex = 0};
           
           coverList.scrollTo(currentIndex*coverWidth, 0);
        }, 4000)

   })

    onDestroy(() => {
        clearInterval(startInterval);
    })
    
</script>

<ul class="cover-wrapper" bind:this={coverList} bind:clientWidth={coverWidth}>
    {#each coverArray as item, idx}
        <li>
            <div class="title" style="height:{imgWidth};">
                <TextBox 
                    tagType="h1" 
                    className="cover-title-bold" 
                    context={item["title-bold"]} 
                />
                <Seperator borderWidth=0 paddingTop=6 paddingBottom=6 />
                <TextBox
                    className="cover-title-thin"
                    context={item["title-thin"]} 
                />
                <Seperator borderWidth=0 paddingTop=12 paddingBottom=12 />
                {#if loginCheck}
                    <a class="btn-go" href={item["link-url1"]}>{item["link-text"]}</a>  
                {:else}
                    <a class="btn-go" href={item["link-url2"]}>{item["link-text"]}</a> 
                {/if}
            </div>
            <img alt="cover-image" width={imgWidth} height={imgWidth} src="{constants.IMG_URL}{item["img-url"]}"/>
        </li>
    {/each}
</ul>

<style lang="scss">
    @import '../../assets/scss/common.scss';

    .cover-wrapper {
        display: flex;
        flex-wrap: nowrap;
        padding-top: 100px;
        overflow-x: hidden;

        @include respond-to('w600') {
            padding-top: 60px;
        } 

        li {
            flex: 0 0 auto;
            display: flex;
            justify-content: space-between;
            width: 100%;

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

                a.btn-go {
                    display: inline-block;
                    color:$theme-color2;
                    border-radius: 30px;
                    font-size: 0.8em;
                    font-weight: 300;

                    &:hover {
                        cursor: pointer;
                    }
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
                border-radius: 4px;

                @include respond-to('w600') {
                    margin-top: 20px;
                    width: 100%;
                    height: auto;
                    border-radius: 3px;
                }
            }
        }
    }
</style>