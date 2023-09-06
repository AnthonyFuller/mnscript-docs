<script setup lang="ts">
export interface Props {
    language?: string
}

withDefaults(defineProps<Props>(), {
    language: "mnscript"
})
</script>

<template>
    <div :class="`language-${language}`">
        <span class="lang">{{ language }}</span>
        <pre class="shiki monokai"><code><span class="line"><span style="color@#F8F82;"><slot></slot></span></span></code></pre>
    </div>
</template>
