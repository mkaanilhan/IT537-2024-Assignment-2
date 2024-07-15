<template>
    <div class="w-full h-3 bg-gray-700 rounded-full relative">
        <div 
            class="h-3 rounded-full" 
            :style="{ width: animatedProgress/2.55 + '%', backgroundColor: progressColor }">
            <div 
                class="slider bg-gray-200" 
                :style="{ left: animatedProgress/2.55 + '%'}">
                <span class="slider-text text-md">{{ Math.round(animatedProgress) }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProgressBar',

    props: {
        progress: {
            type: Number,
            required: true,
            validator: function(value) {
                return value >= 0 && value <= 255;
            }
        }
    },
    data() {
        return {
            animatedProgress: 0
        };
    },
    computed: {
        progressColor() {
            /* Calculate the hue value 
             * stat:   1 ~ hue: -60 (magenta)
             * stat:  45 ~ hue:   0 (red)
             * stat:  70 ~ hue:  60 (yellow) -this is mid value for all pokemon stats-
             * stat: 150 ~ hue: 150 (green)
             * stat: 255 ~ hue: 180 (cyan) 
             */
            const hue = Math.floor(255 * Math.sqrt(this.progress / 255))-75;
            return `hsl(${hue}, 90%, 75%)`;
        }
    },
    watch: {
        progress: {
            immediate: true,
            handler(newValue) {
                this.animateProgress(newValue);
            }
        }
    },
    methods: {
        animateProgress(targetValue) {
            const startValue = this.animatedProgress;
            const duration = 2000;
            const startTime = performance.now();

            const animate = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                this.animatedProgress = startValue + (targetValue - startValue) * progress;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        }
    }
};
</script>

<style scoped>
.slider {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    position: absolute;
    top: -11px; 
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: black; 
    font-size: 12px;
}

.slider-text {
    position: absolute;
    text-align: center;
    width: 100%;
}
</style>
