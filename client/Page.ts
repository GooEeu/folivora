import { IPageData } from '../model/Page.interface';

export default class Page {
    private index: number;
    private url: string;

    constructor(data: IPageData) {
        this.index = typeof data.index === 'number' ? data.index : parseInt(data.index, 10);
        this.url = data.url;

        if (data.previousUrl) {
            $('#previous-slide').css('background-image', `url(${data.previousUrl})`);
        }

        if (data.nextUrl) {
            $('#next-slide').css('background-image', `url(${data.nextUrl})`);
        }

        $('body').attr('data-currentIndex', this.index);

        this.preLoadAndShow();

        $('#progress').css('width', `${data.progress * 100}%`);
    }

    private preLoadAndShow() {
        $('#current-slide').css('background-image', `url(images/loading.svg)`);

        let image = new Image();
        image.onload = () => {
            let currentIndex = parseInt($('body').attr('data-currentIndex'), 10);

            if (currentIndex === this.index) {
                $('#current-slide').css('background-image', `url(${this.url})`);
            }
        }
        image.src = this.url;
    }
}
