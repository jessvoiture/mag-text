<script>
  export let path;
  export let height;
</script>

<svg width="100" {height} xmlns="http://www.w3.org/2000/svg">
  <!-- Draw a curved line -->
  <path d={path} stroke="#c4c4c4" fill="none" />
  <!--           
           M 10 0 C 20 0 35 1 35 55
           M 10 0 C 20 0 35 1 35 -64
           M 10 0 C 2 0 -31 0 -31 -67
            -->
</svg>
