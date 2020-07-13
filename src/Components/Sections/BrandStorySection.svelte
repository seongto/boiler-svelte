<script>
    import * as constants   from '../../assets/js/constants.js';
    import { onMount }      from 'svelte';
    import TextBox          from '../TextBox.svelte';
    import axios            from "axios";


    const mixArray = (a, b) => {  
        return 0.5 - Math.random();
    } 


    let brStroies = [];

    let brandStoryList;
    let scrollWidth;
    let scrollX; 
    let boxWidth;
    let wrapperWidth;
    $: handleScroll(scrollX);  

    function clickToLink(target) {
        window.open(target);
    }

    const handleScroll = (x) => {
        if (x){
            brandStoryList.scrollTo(x, 0);
        } else if ( x === 0){
            brandStoryList.scrollTo(x, 0);
        }
    }

    const handleScrollX = () => {
        scrollX = brandStoryList.scrollLeft;
    }

    onMount(() => {
        scrollX = 0;
        axios.get(`http://${constants.SERVER_API}/page-management/brand-stories/list/landing`)
            .then(resp => {
                brStroies = resp.data["brand_stories_list"].sort(mixArray);
            }
        );
    });

</script>

<div class="brand-story-wrapper" bind:clientWidth={wrapperWidth}>
    <slot></slot>
    <ul bind:this={brandStoryList} bind:clientWidth={scrollWidth} on:scroll={() => handleScrollX()}> 
        {#each brStroies as item}
            <li bind:clientWidth={boxWidth} on:click={() => clickToLink(item["link_url"])}>
                <span>{item["name"]}</span>
                <TextBox
                    tagType="h3"
                    className="br-title"
                    context={item["title"]}
                />
                <p>{item["description"]}</p>
            </li>
        {/each}
    </ul>
    {#if wrapperWidth < boxWidth}
        <input type="range" bind:value={scrollX} max={(boxWidth*5)-scrollWidth+80} >
    {/if}
</div>


<style lang="scss">
    @import '../../assets/scss/common.scss';

    .brand-story-wrapper {
        width: 100%;
        
        ul {
            width: auto;
            margin-top: 30px;
            overflow-x: scroll;
            display: flex;
            flex-wrap: nowrap;

            &::-webkit-scrollbar {
                display: none;
            }

            li {
                width: 280px;
                height: 280px;
                flex: 0 0 auto;
                display: block;
                border : 1px solid black;
                border-radius : 8px;
                padding: 20px;
                margin-right: 15px;
                overflow: hidden;

                @include respond-to('w600') {
                    width: 240px;
                    height: 240px;
                }

                &:hover {
                    cursor: pointer;
                }

                &:last-child {
                    margin-right: 0;
                }

                span {
                    font-size: 0.6em;
                    color: $theme-color1;
                    display: block;
                    margin-bottom: 3px;
                }

                :global(h3.br-title) {
                    display: block;
                    font-size: 1.1em;
                    line-height: 1.2em;
                    font-weight: 700;
                    color: black;

                    &:hover {
                        cursor: pointer;
                    }

                    &::placeholder {
                        color: black;
                    }
                }

                p {
                    margin-top: 8px;
                    font-size: 0.7em;
                }
            }
        }
        
        input[type=range] {
            display: block;
            margin-top: 22px;
            width: 300px;

            @include respond-to('w600') {
                display: none;
            }

            //기존 디자인 숨기기
            -webkit-appearance: none; 
            width: 100%;
            background: transparent;

            &::-webkit-slider-thumb {
                -webkit-appearance: none;
            }
            
            &:focus {
                outline: none;
            }

            &::-ms-track {
                width: 100%;
                cursor: pointer;

                background: transparent; 
                border-color: transparent;
                color: transparent;
            }

            // thumb 수정
            &::-webkit-slider-thumb {
                -webkit-appearance: none;
                height: 24px;
                width: 8px;
                border-radius: 5px;
                background: lighten($theme-color1, 20%);
                cursor: pointer;
                margin-top: -9px;
                border: none;
            }

            &::-moz-range-thumb {
                height: 24px;
                width: 8px;
                border-radius: 5px;
                background: lighten($theme-color1, 20%);
                cursor: pointer;
                border: none;
            }

            &::-ms-thumb {
                height: 24px;
                width: 8px;
                border-radius: 5px;
                background: lighten($theme-color1, 20%);
                cursor: pointer;
                border: none;
            }

            // track 수정
            &::-webkit-slider-runnable-track {
                width: 100%;
                height: 4px;
                cursor: pointer;
                background: #f3f3f3;
                border-radius: 2px;
            }

            &:focus::-webkit-slider-runnable-track {
                background: #f3f3f3;
            }

            &::-moz-range-track {
                width: 100%;
                height: 4px;
                cursor: pointer;
                background: #f3f3f3;
                border-radius: 2px;
            }

            &::-ms-track {
                width: 100%;
                height: 4px;
                cursor: pointer;
                background: transparent;
                border-color: transparent;
                color: transparent;
            }

            &::-ms-fill-lower {
                background: #f3f3f3;
                border-radius: 2px;
            }

            &:focus::-ms-fill-lower {
                background: #f3f3f3;
            }

            &::-ms-fill-upper {
                background: #f3f3f3;
                border-radius: 2px;
            }

            &:focus::-ms-fill-upper {
                background: #f3f3f3;
            }

        }
    }


</style>

