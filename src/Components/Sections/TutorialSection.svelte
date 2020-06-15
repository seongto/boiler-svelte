<script>
    import * as constants from '../../assets/js/constants.js';
    import { onMount } from 'svelte';

    let tutorials = [
        {
            "text": "allius를 소개합니다",
            "finished": false,
            "link": "https://blog.allius.io/2020/01/02/work-become-contents",
            "public": true,
        },{
            "text": "프로젝트 만들기",
            "finished": false,
            "link": "https://youtube.com",
            "public": false,
        },{
            "text": "나의 브랜드 관리하기",
            "finished": false,
            "link": "https://youtube.com",
            "public": false,
        },{
            "text": "프로폴리오로 자랑하기",
            "finished": false,
            "link": "https://youtube.com",
            "public": false,
        },
    ]

    let tutorialStage;

    function tutorialProgress(eventIdx){
        tutorialStage[eventIdx] = true;
        localStorage.setItem(constants.T_STAGE, JSON.stringify(tutorialStage));
        drawTutorialStage(tutorialStage);
    }

    function drawTutorialStage(stage){
        for ( let i = 0; i < stage.length; i++ ){
            tutorials[i]["status"] = stage[i];
        }
    }

    onMount(() => {
        tutorialStage = JSON.parse(localStorage.getItem(constants.T_STAGE));

        if (tutorialStage) {
            drawTutorialStage(tutorialStage);
        } else {
            tutorialStage = [ false, false, false, false ];
        }
    })

</script>

<div class="tutorial-wrapper">
    <slot></slot>
    <ul>
        {#each tutorials as item, index}
            <li class={ item["status"] ? "finished" : ""} >
            {#if item["public"]}
                <a href={item["link"]} target="_blank" on:click={() => tutorialProgress(index)} >
                    <p>0{index+1}</p>
                    <span>{item["text"]}</span>
                </a>
            {:else}
                <a href="javascript:void(0);" class="not-opened">
                    <p>0{index+1}</p>
                    <span class="coming">coming soon</span>
                    <span>{item["text"]}</span>
                </a>
            {/if}
            </li>
        {/each}
    </ul>
</div>

<style lang="scss">
    @import '../../assets/scss/common.scss';

    .tutorial-wrapper {

        ul {
            display: flex;
            margin-top: 20px;
            justify-content: left;
            flex-wrap : wrap;
            
            li {
                display: block;
                margin-right: 15px;
                margin-top: 15px;

                &:hover {
                    cursor: pointer;
                }

                &:last-child {
                    margin-right: 0;
                }

                @include respond-to('w400') {
                    width: 100%;
                    margin-right: 0;
                }
                
                a {
                    display: block;
                    font-weight: 700;
                    background-color: white;
                    border: 4px solid $theme-color1;
                    border-radius: 12px;
                    padding: 10px;
                    width : 150px;
                    height: 150px;
                    font-size : 1em;
                    color: $theme-color1;
                    

                    @include respond-to('w400') {
                        width: 100%;
                        height: 105px;
                    }
                }

                a.not-opened {
                    line-height: 1.1em;

                    span {
                        color : lighten($theme-color1, 30%);
                        font-size: 0.8em;

                        &.coming {
                            display: block;
                            color: $theme-color1;
                            margin: 5px 0;
                        }
                    }
                }
            }

            li.finished {

                a {
                    background-color: $theme-color1;
                    color: white;

                    span {
                        color: rgba(255,255,255, 0.6);
                    }
                }
            }
        }
    }
</style>