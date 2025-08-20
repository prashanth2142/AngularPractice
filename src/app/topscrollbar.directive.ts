import { Directive, ElementRef, AfterViewInit, OnDestroy, Input } from '@angular/core';

@Directive({
  selector: '[appTopscrollbar]',
  standalone: true
})
export class TopScrollbarDirective implements AfterViewInit, OnDestroy {
  @Input() targetSelector: string = '.p-datatable-wrapper';
  @Input() scrollbarHeight: string = '20px';
  
  private topScrollbar!: HTMLDivElement;
  private targetElement!: HTMLElement;
  private scrollSyncHandler!: () => void;
  private targetScrollHandler!: () => void;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.createTopScrollbar();
    this.setupScrollSync();
  }

  ngOnDestroy() {
    this.removeEventListeners();
  }

  private createTopScrollbar() {
    this.topScrollbar = document.createElement('div');
    this.topScrollbar.className = 'top-scrollbar-container';
    
    const scrollContent = document.createElement('div');
    scrollContent.className = 'top-scrollbar-content';
    
    this.topScrollbar.style.cssText = `
      width: 100%;
      height: ${this.scrollbarHeight};
      overflow-x: auto;
      overflow-y: hidden;
      margin-bottom: 10px;
      border: 1px solid #dee2e6;
      border-radius: 4px;
      background: #f8f9fa;
    `;
    
    scrollContent.style.cssText = `
      height: 1px;
      width: 100%;
    `;
    
    this.topScrollbar.appendChild(scrollContent);
    this.el.nativeElement.appendChild(this.topScrollbar);
    
    setTimeout(() => {
      this.updateScrollbarWidth();
    }, 100);
  }

  private setupScrollSync() {
    setTimeout(() => {
      this.targetElement = this.findTargetElement();
      
      if (this.targetElement) {
        this.updateScrollbarWidth();
        
        this.scrollSyncHandler = () => {
          this.targetElement.scrollLeft = this.topScrollbar.scrollLeft;
        };
        
        this.targetScrollHandler = () => {
          this.topScrollbar.scrollLeft = this.targetElement.scrollLeft;
        };
        
        this.topScrollbar.addEventListener('scroll', this.scrollSyncHandler);
        this.targetElement.addEventListener('scroll', this.targetScrollHandler);
      }
    }, 200);
  }

  private findTargetElement(): HTMLElement {
    let target = document.querySelector(this.targetSelector) as HTMLElement;
    
    if (!target) {
      const selectors = [
        '.p-datatable-wrapper',
        '.p-datatable-scrollable-body',
        '.table-container',
        '.p-element'
      ];
      
      for (const selector of selectors) {
        target = document.querySelector(selector) as HTMLElement;
        if (target) break;
      }
    }
    
    return target;
  }

  private updateScrollbarWidth() {
    if (this.targetElement) {
      const scrollContent = this.topScrollbar.querySelector('.top-scrollbar-content') as HTMLElement;
      if (scrollContent) {
        scrollContent.style.width = `${this.targetElement.scrollWidth}px`;
      }
    }
  }

  private removeEventListeners() {
    if (this.topScrollbar && this.scrollSyncHandler) {
      this.topScrollbar.removeEventListener('scroll', this.scrollSyncHandler);
    }
    if (this.targetElement && this.targetScrollHandler) {
      this.targetElement.removeEventListener('scroll', this.targetScrollHandler);
    }
  }
}