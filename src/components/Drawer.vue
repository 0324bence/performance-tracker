<script setup lang="ts">
    import IconCross from "./icons/IconCross.vue";
</script>

<template>
    <div class="drawer">
        <div class="header">
            <div class="texts">
                <p>Archívum</p>
                <h2>Mentett műszakok</h2>
            </div>
            <div class="header-actions">
                <button class="close">
                    <IconCross />
                </button>
            </div>
        </div>
        <div class="content"><p>1</p></div>
        <div class="actions"></div>
    </div>
</template>

<style lang="scss" scoped>
    @use "@/assets/variables.scss" as *;
    @use "sass:color";

    .drawer {
        position: fixed;
        left: 0;
        top: 0;
        height: 100vh;
        width: 25rem;
        background: linear-gradient(0deg, $bg-secondary, $bg-primary);
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
        z-index: 1200;

        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: center;

        .header {
            padding: 18px 18px 14px;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 12px;
            border-bottom: 1px solid color-mix(in srgb, $purple-highlight, rgba(0, 0, 0, 0) 60%);

            .texts {
                display: flex;
                flex-direction: column;
                gap: 8px;

                p {
                    // font-size: 0.875rem;
                    font-size: 0.78rem;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    color: $text-tertiary;
                }

                h2 {
                    font-size: 1.3rem;
                    color: $purple-highlight;
                }
            }

            .header-actions {
                width: 5%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                gap: 8px;

                .close {
                    width: 100%;
                    aspect-ratio: 1 / 1;
                    border: none;
                    background: none;
                    outline: none;
                    cursor: pointer;

                    color: $text-primary;

                    &:hover {
                        filter: brightness(80%);
                    }
                }
            }
        }

        .content {
            flex: 1;
        }

        .actions {
            flex: 0 1;
        }
    }
</style>
