import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

export class DOMWingman<T> {
    private _fixture: ComponentFixture<T>;
    constructor(fixture: ComponentFixture<T>) {
        this._fixture = fixture;
    }

    singleText(selector: string): string {
        const el = this._fixture.debugElement.queryAll(By.css(selector));
        if (el) {
            return el[0].nativeElement.textContent;
        }
    }

    numberOfItemsWithText(selector: string, textContent: string): number {
        const el = this._fixture.debugElement.queryAll(By.css(selector));
        return el.filter(child => child.nativeElement.textContent == textContent).length;
    }

    numberOfChildren(selector: string): number {
        const el = this._fixture.debugElement.queryAll(By.css(selector));
        if (el) {
            return el[0].nativeElement.children.length;
        }
    }


    numberOfMatchingItems(selector: string): number {
        const el = this._fixture.debugElement.queryAll(By.css(selector));
        return el.length;
    }

    getSingleChild(parentSelector: string, childSelector: string) {
        const el = this._fixture.debugElement.queryAll(By.css(parentSelector));
        if (el) {
            return el[0].nativeElement.children[0].querySelector(childSelector);
        }
    }

    clickOnButton(selector: string) {
        const linkDes = this._fixture.debugElement.queryAll(By.css(selector));
        const nativeButton: HTMLButtonElement = linkDes[0].nativeElement;
        nativeButton.click();   
        this._fixture.detectChanges();    
    }

    returnItem(selector: string) {
        return this._fixture.debugElement.queryAll(By.css(selector));
    }

}
