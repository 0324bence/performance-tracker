<script setup lang="ts">
    import { ref, useTemplateRef, watch } from "vue";
    import IconCross from "./icons/IconCross.vue";

    const props = defineProps<{
        isOpen: boolean;
    }>();

    const emit = defineEmits<{
        (e: "close"): void;
        (e: "create-new"): void;
        (e: "upload-data"): void;
    }>();

    function closeModal() {
        emit("close");
    }

    function chooseCreateNew() {
        emit("create-new");
    }

    function chooseUploadData() {
        emit("upload-data");
    }
</script>

<template>
    <div ref="modal" class="modal" :class="{ closed: !props.isOpen }">
        <div id="modalOverlay" class="modal-overlay" @click="closeModal"></div>
        <div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="newOrUploadModalTitle">
            <button class="choice-button" type="button" @click="chooseCreateNew">
                <strong>Üres létrehozása</strong>
                <span>Kezdjen egy üres feladatlistával</span>
            </button>
            <div class="divider" aria-hidden="true"></div>
            <button class="choice-button" type="button" @click="chooseUploadData">
                <strong>Adatok feltöltése</strong>
                <span>Importáljon egy meglévő CSV fájlt</span>
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @use "@/assets/variables.scss" as *;

    .modal {
        position: fixed;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 15;
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        transition: all 0.2s ease;

        &.closed {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
        }

        .modal-overlay {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.6);
        }

        .modal-panel {
            position: relative;
            display: grid;
            grid-template-columns: 1fr 1px 1fr;
            align-items: stretch;
            padding: 1rem;
            width: 50%;
            height: 30%;
            background: $bg-primary;
            border: 1px solid $border-color;
            border-radius: 8px;
            overflow: hidden;

            .divider {
                width: 1px;
                background: $border-color;
            }

            .choice-button {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 10px;
                margin: 0 8px;
                padding: 28px 20px;
                border: 1px solid transparent;
                border-radius: 6px;
                background: transparent;
                color: $text-primary;
                cursor: pointer;
                transition:
                    background-color 0.2s ease,
                    border-color 0.2s ease,
                    transform 0.2s ease;

                strong {
                    font-size: 1.25rem;
                    font-weight: 600;
                }

                span {
                    color: $text-secondary;
                    font-size: 0.9rem;
                    text-align: center;
                }

                &:hover {
                    border-color: $border-color;
                    background: $bg-secondary;
                    transform: translateY(-2px);
                }

                &:active {
                    transform: translateY(0);
                }

                &:focus-visible {
                    outline: 2px solid $purple-highlight;
                    outline-offset: 2px;
                }
            }

            .icon-btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 32px;
                height: 32px;
                padding: 0;
                border: none;
                border-radius: 6px;
                background-color: transparent;
                cursor: pointer;
                transition: all 0.2s ease;
                color: $text-primary;

                &:hover {
                    transform: scale(1.1);
                }

                &:active {
                    transform: scale(0.95);
                }
            }
        }
    }
</style>
