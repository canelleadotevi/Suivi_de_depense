<template>
    <section id="Section">
          <div class="container">
            <div class="service_content">
              <div class="service_content_title">
                <h2>Nous proposons:</h2>
              </div>
              <div class="service_content_paragraph">
                <p></p>
              </div>
              <div class="services__content__box">
                <div class="service_content_service_detail">
                  <div
                    class="service_content_service_detail_item"
                    v-for="element in tab"
                  >
                   <div class="service_first_part_content">
                    <div class="service_content_detail_image">
                      <img src="@/assets/images/service1.png" alt="" />
                    </div>
                    <h3>{{ element.title }}</h3>
                    <p>
                      {{ element.paragraph }}
                    </p>
                   </div>
                    <div class="service_content_service_button_first">
                      <div class="service_content_service_button">
                        <a href="#"> Découvrir </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="more_information">
                <a href="#">Découvrir</a>
              </div>
            </div>
          </div>
        </section>
</template>
<script lang="ts" setup>
import {tab} from "@/api/tabdatabase";
</script>
<style scoped>

</style>