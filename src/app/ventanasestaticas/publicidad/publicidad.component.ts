import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-publicidad',
  standalone: true,
  imports: [],
  templateUrl: './publicidad.component.html',
  styleUrl: './publicidad.component.css'
})

export class PublicidadComponent implements OnInit, OnDestroy {
  imagenUrl: string = '';
  private imagenes: string[] = [
    'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGNxZnRzMTY5NjgwZW8xajdmcnM3d29lbmhtNWQ2czdmc2JhemoybCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fYfbJWHwT9mbTOOQoU/giphy.gif',
    'https://media.giphy.com/media/B0XqjtSl2VPGcFCpZk/giphy.gif?cid=ecf05e47oasl6clqrd0ig519mebyr2t18ta8nefj6wu8nrob&ep=v1_gifs_related&rid=giphy.gif&ct=g',
    'https://media.giphy.com/media/Lc3HIXmhyFsc4NRt7I/giphy.gif?cid=ecf05e47uvp678pxs1bgkn3006msbbzg3m1msgiucvc709r0&ep=v1_gifs_related&rid=giphy.gif&ct=g',
    'https://media.giphy.com/media/ipSS0WxHOcEINPdQGS/giphy.gif?cid=ecf05e47uvp678pxs1bgkn3006msbbzg3m1msgiucvc709r0&ep=v1_gifs_related&rid=giphy.gif&ct=g',
    'https://media.giphy.com/media/1t1qok8I559HqBnwvr/giphy.gif?cid=ecf05e47wf5r8lzisbc08xhqelt8h8ui4t2tcdcqqiiuls13&ep=v1_gifs_related&rid=giphy.gif&ct=g',
    'https://media.giphy.com/media/Nh1PApjW9TyI02H0Ih/giphy.gif?cid=ecf05e47n45mchbxm3rzxujlmzlagna2ye0l9l7z8wnj3wwt&ep=v1_gifs_related&rid=giphy.gif&ct=g',
    'https://media.giphy.com/media/BMt2uqtXUgIAOEaVqo/giphy.gif?cid=ecf05e47g9zato41goiski0omwk36tnol54z2krtth9t0533&ep=v1_gifs_related&rid=giphy.gif&ct=g',
    'https://media.giphy.com/media/EGiBhTZMXedIA/giphy.gif?cid=ecf05e47g9zato41goiski0omwk36tnol54z2krtth9t0533&ep=v1_gifs_related&rid=giphy.gif&ct=g',
    'https://media.giphy.com/media/ti1lnlK4QbRMC0HBCl/giphy.gif?cid=ecf05e47wrxd4osilt62rdap1zf1x8kotfkm1n3uk8mkwcxd&ep=v1_gifs_related&rid=giphy.gif&ct=g',
    'https://media.giphy.com/media/nt24R6rYWYKL1kVnhX/giphy.gif?cid=ecf05e47wf5r8lzisbc08xhqelt8h8ui4t2tcdcqqiiuls13&ep=v1_gifs_related&rid=giphy.gif&ct=g'
  ];
  private index = 0;
  private intervalId: any;

  ngOnInit(): void {
    this.imagenUrl = this.imagenes[this.index];
    this.intervalId = setInterval(() => {
      this.index = (this.index + 1) % this.imagenes.length;
      this.imagenUrl = this.imagenes[this.index];
    }, 30000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

}