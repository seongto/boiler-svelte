<script>
    import * as constants   from '../../assets/js/constants.js';
    import { onMount }      from 'svelte';
    import TextBox          from '../TextBox.svelte';

    const mixArray = (a, b) => {  
        return 0.5 - Math.random();
    } 


    let brStroies = [
        {
            "user_name" : "박진규",
            "story_title" : "발 빠르게 움직이는\n비즈니스 디벨로퍼",
            "description" : "금융, 컨설팅, 전략에 자신 있습니다. 유니콘 스타트업 Case Study를 운영하며 얻은 인사이트를 곧바로 비즈니스로 연결합니다.",
            "link_to" : "https://allius.io/@david",
        },{
            "user_name" : "최보미",
            "story_title" : "잘 넘어가도록\n포장합니다",
            "description" : "잘 전달하기 위해 벗기기도 하고, 입히기도 하고, 뜯어도 봅니다. 포장이라 했지만 실은 언박싱 전문인 듯 합니다. 목넘김이 좋은 글을 씁니다.",
            "link_to" : "https://allius.io/@bom",
        },{
            "user_name" : "장정은",
            "story_title" : "떼인 꿈 받아드리는\n스타트업 해결사",
            "description" : "스타트업이 성장하는 과정에서 직면하는 다양한 리스크를 관리합니다. 불필요하고 불합리한 규제를 개선하고 제도를 만들어가고자 합니다.",
            "link_to" : "https://allius.io/@sophia",
        },{
            "user_name" : "오하니",
            "story_title" : "향수\n읽어주는 여자",
            "description" : "향기는 우리의 기억과 감정에 영향을 미칩니다. 한국의 문화와 한국인의 감성으로 향을 만들고, 세계에 한국을 이야기하고 싶습니다.",
            "link_to" : "https://allius.io/@nalda",
        },{
            "user_name" : "신재욱",
            "story_title" : "모험을 즐기는\n공유 오피스 탐험가",
            "description" : "'함께 일하는 공간'이 궁금합니다. 스타트업을 운영하며 방문하는 다양한 공유 오피스들의 특색을 파악해 글로 남깁니다.",
            "link_to" : "https://allius.io/@jacob",
        },
    ].sort(mixArray);

    let brandStoryList;
    let scrollWidth;
    let scrollX; 
    let boxWidth;
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
    });

</script>

<div class="brand-story-wrapper">
    <slot></slot>
    <ul bind:this={brandStoryList} bind:clientWidth={scrollWidth} on:scroll={() => handleScrollX()}> 
        {#each brStroies as item}
            <li bind:clientWidth={boxWidth} on:click={() => clickToLink(item["link_to"])}>
                <span>{item["user_name"]}</span>
                <TextBox
                    tagType="h3"
                    className="br-title"
                    context={item["story_title"]}
                />
                <p>{item["description"]}</p>
            </li>
        {/each}
    </ul>
    <input type="range" bind:value={scrollX} max={(boxWidth*5)-scrollWidth+80} >
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

