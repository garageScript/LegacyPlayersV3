import {NgModule} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {SearchComponent} from "./component/search/search";
import {CommonModule} from "@angular/common";
import {TableModule} from "../../../../template/table/module";
import {SearchRouting} from "./routing";
import {CharacterSearchService} from "./service/character_search";

@NgModule({
    declarations: [SearchComponent],
    imports: [
        CommonModule,
        TranslateModule,
        SearchRouting,
        TableModule
    ],
    exports: [SearchComponent],
    providers: [
        CharacterSearchService
    ]
})
export class SearchModule {
}