<script setup lang="ts">
    import { ref, useTemplateRef, watch } from "vue";
    import IconCross from "./icons/IconCross.vue";

    const props = defineProps<{
        isOpen: boolean;
    }>();

    const emit = defineEmits<{
        (e: "close"): void;
    }>();

    function closeModal() {
        emit("close");
    }
</script>

<template>
    <div ref="modal" id="uploadModal" class="modal" :class="{ closed: !props.isOpen }">
        <div id="modalOverlay" class="modal-overlay"></div>
        <div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="uploadModalTitle">
            <div class="modal-header">
                <h3 id="uploadModalTitle">Feladatok importálása</h3>
                <button
                    id="closeUploadBtn"
                    class="icon-btn"
                    type="button"
                    title="Bezárás"
                    aria-label="Bezárás"
                    @click="closeModal"
                >
                    <IconCross />
                </button>
            </div>

            <div class="modal-body">
                <div class="modal-left">
                    <label class="file-label" for="taskFileInput">Fájl kiválasztása</label>
                    <input id="taskFileInput" type="file" accept=".csv,text/csv" />

                    <label class="paste-label" for="taskPasteArea">Vagy illeszd be a fájl tartalmát lentebb</label>
                    <textarea
                        id="taskPasteArea"
                        class="task-paste"
                        placeholder="CSV tartalom beillesztése ide..."
                    ></textarea>

                    <div class="modal-actions">
                        <button id="importTasksBtn" class="btn btn-primary" type="button">Importálás</button>
                        <!-- <button id="closeBottomBtn" class="btn btn-danger" type="button">Bezárás</button> -->
                    </div>
                </div>

                <div class="modal-right">
                    <div class="sample-header">
                        <h4>Minta CSV</h4>
                        <button
                            id="downloadSampleBtn"
                            class="icon-btn icon-btn-primary"
                            type="button"
                            title="Minta CSV letöltése"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                width="16"
                                height="16"
                                stroke="currentColor"
                                stroke-width="2"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                        </button>
                    </div>

                    <pre class="sample-code" id="sampleCsvBlock">
Feladat neve,Allokált percek
E-mail áttekintés,15
Kódáttekintés,30
Csapatmegbeszélés,60
</pre
                    >
                </div>
            </div>
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
        transition: all 0.3s ease;

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
            width: 96%;
            height: 92%;
            background: $bg-primary;
            border: 1px solid $border-color;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
            transform: translateY(0) scale(1);

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

            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 14px 18px;
                border-bottom: 1px solid $border-color;

                h3 {
                    color: $text-primary;
                    font-size: 1.3rem;
                    line-height: 1.2;
                }
            }

            .modal-body {
                display: grid;
                grid-template-columns: 1fr 420px;
                gap: 18px;
                padding: 18px;
                height: 100%;
                min-height: 0;

                .modal-left,
                .modal-right {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    min-height: 0;
                }

                .modal-left {
                    label {
                        color: $text-secondary;
                        font-size: 0.95rem;
                    }

                    input[type="file"] {
                        background: linear-gradient(
                            180deg,
                            color-mix(in srgb, $bg-secondary, transparent 40%),
                            color-mix(in srgb, $bg-primary, transparent 40%)
                        );
                        border: 1px solid $border-color;
                        color: $text-primary;
                        padding: 10px 12px;
                        border-radius: 8px;
                        cursor: pointer;
                    }

                    input[type="file"]::file-selector-button {
                        background: linear-gradient(135deg, $purple-accent, $purple-highlight);
                        color: white;
                        border: none;
                        padding: 8px 12px;
                        border-radius: 6px;
                        margin-right: 8px;
                        cursor: pointer;
                    }

                    .task-paste {
                        flex: 1;
                        min-height: 280px;
                        resize: vertical;
                        padding: 14px;
                        background: #0b0b16;
                        color: $text-primary;
                        border: 1px solid $purple-highlight;
                        border-radius: 8px;
                        box-shadow: inset 0 2px 12px rgba(0, 0, 0, 0.6);
                        font-family: inherit;
                        font-size: 0.95rem;

                        &:focus {
                            outline: none;
                            border-color: $purple-accent;
                            box-shadow:
                                0 0 0 4px color-mix(in srgb, $purple-accent, transparent 88%),
                                inset 0 2px 12px rgba(0, 0, 0, 0.6);
                        }

                        &::placeholder {
                            color: color-mix(in srgb, $text-primary, transparent 55%);
                        }
                    }

                    .modal-actions {
                        display: flex;
                        gap: 10px;
                        margin-top: 8px;

                        .btn {
                            padding: 12px 24px;
                            border: none;
                            border-radius: 8px;
                            font-size: 1rem;
                            font-weight: 600;
                            display: inline-flex;
                            align-items: center;
                            justify-content: center;
                            gap: 8px;
                            cursor: pointer;
                            transition: all 0.3s ease;
                            font-family: arial;
                        }

                        .btn-primary {
                            background: linear-gradient(135deg, $purple-accent, $purple-highlight);
                            color: white;

                            &:hover {
                                transform: translateY(-2px);
                                box-shadow: 0 8px 16px color-mix(in srgb, $purple-accent, transparent 60%);
                            }
                        }

                        .btn-danger {
                            background-color: $error;
                            color: white;

                            &:hover {
                                background-color: color-mix(in srgb, $error, white 15%);
                            }
                        }
                    }
                }

                .modal-right {
                    min-width: 0;

                    .sample-header {
                        display: flex;
                        align-items: center;
                        gap: 10px;

                        h4 {
                            margin: 0;
                            color: $purple-highlight;
                            font-size: 1.05rem;
                        }

                        .icon-btn-primary {
                            color: $purple-highlight;

                            &:hover {
                                background-color: color-mix(in srgb, $purple-highlight, transparent 80%);
                            }
                        }
                    }

                    .sample-code {
                        background: $bg-secondary;
                        color: $text-primary;
                        padding: 12px;
                        border-radius: 6px;
                        border: 1px solid $border-color;
                        overflow: auto;
                        max-height: 68%;
                        white-space: pre-wrap;
                    }
                }
            }
        }
    }

    @media (max-width: 1024px) {
        .modal-body {
            grid-template-columns: 1fr;
        }

        .modal-panel {
            width: 96%;
            height: 86%;
        }
    }
</style>
