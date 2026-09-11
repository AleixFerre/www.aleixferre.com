import {
  Component,
  computed,
  HostListener,
  inject,
  input,
  signal,
} from '@angular/core';
import { UnpicImageDirective } from '@unpic/angular';
import {
  Gallery,
  GalleryItem,
  ImageItem,
  ImageSize,
  ThumbnailsPosition,
} from 'ng-gallery';
import { Lightbox, LightboxModule } from 'ng-gallery/lightbox';

@Component({
  selector: 'app-gallery',
  imports: [LightboxModule, UnpicImageDirective],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  private readonly gallery = inject(Gallery);
  private readonly lightbox = inject(Lightbox);

  readonly images = input<string[]>([]);
  readonly thumbs = input<string[] | null>(null);

  readonly gridSize = signal(3);

  readonly displayImages = computed(() => {
    const thumbs = this.thumbs();
    return thumbs && thumbs.length ? thumbs : this.images();
  });

  @HostListener('window:resize')
  onResize() {
    this.recalculateGalleryCount();
  }

  private recalculateGalleryCount() {
    if (window.innerWidth < 1000) {
      this.gridSize.set(1);
    } else {
      this.gridSize.set(Math.min(Math.max(this.images().length, 2), 4));
    }
  }

  ngOnInit(): void {
    const thumbs = this.thumbs();
    const items: GalleryItem[] = this.images().map(
      (item, index) =>
        new ImageItem({ src: item, thumb: thumbs?.[index] ?? item }),
    );

    this.recalculateGalleryCount();

    this.lightbox.setConfig({
      keyboardShortcuts: true,
      exitAnimationTime: 200,
    });

    const lightboxRef = this.gallery.ref('lightbox');
    lightboxRef.setConfig({
      imageSize: ImageSize.Contain,
      thumbPosition: ThumbnailsPosition.Top,
      thumbs: true,
      loop: true,
    });
    lightboxRef.load(items);
  }
}
