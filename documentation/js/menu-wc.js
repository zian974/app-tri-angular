'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">app-base documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AgentsSelectModule.html" data-type="entity-link" >AgentsSelectModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AgentsSelectModule-133810f61d5206609a461034b26fb04d2b13b2f4dfa7c4766abf84b09e56330af2946c2620423c5acd1b08ce79e953b36e70c23a5da723159302f98762a4a424"' : 'data-target="#xs-components-links-module-AgentsSelectModule-133810f61d5206609a461034b26fb04d2b13b2f4dfa7c4766abf84b09e56330af2946c2620423c5acd1b08ce79e953b36e70c23a5da723159302f98762a4a424"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AgentsSelectModule-133810f61d5206609a461034b26fb04d2b13b2f4dfa7c4766abf84b09e56330af2946c2620423c5acd1b08ce79e953b36e70c23a5da723159302f98762a4a424"' :
                                            'id="xs-components-links-module-AgentsSelectModule-133810f61d5206609a461034b26fb04d2b13b2f4dfa7c4766abf84b09e56330af2946c2620423c5acd1b08ce79e953b36e70c23a5da723159302f98762a4a424"' }>
                                            <li class="link">
                                                <a href="components/AgentsSelectComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AgentsSelectComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-e622d9931cc82df0d95be8b4278dd48cd2753c5e4ace4fb13a2a595fa0cced9e2e650b39bfdefa19b4e12a10e314fa5c8bce656fb51034456cbb6a1a02dbb1f7"' : 'data-target="#xs-components-links-module-AppModule-e622d9931cc82df0d95be8b4278dd48cd2753c5e4ace4fb13a2a595fa0cced9e2e650b39bfdefa19b4e12a10e314fa5c8bce656fb51034456cbb6a1a02dbb1f7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-e622d9931cc82df0d95be8b4278dd48cd2753c5e4ace4fb13a2a595fa0cced9e2e650b39bfdefa19b4e12a10e314fa5c8bce656fb51034456cbb6a1a02dbb1f7"' :
                                            'id="xs-components-links-module-AppModule-e622d9931cc82df0d95be8b4278dd48cd2753c5e4ace4fb13a2a595fa0cced9e2e650b39bfdefa19b4e12a10e314fa5c8bce656fb51034456cbb6a1a02dbb1f7"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SpinnerModule.html" data-type="entity-link" >SpinnerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SpinnerModule-4492b39c2c25a3eae89e8afafd58f221132e7232e442bec6b6ba1acff2e8e9b9bed6201dd96e071bdfa4c368a5291d284b65ae44cf6287f7673f49e786ca5cbf"' : 'data-target="#xs-components-links-module-SpinnerModule-4492b39c2c25a3eae89e8afafd58f221132e7232e442bec6b6ba1acff2e8e9b9bed6201dd96e071bdfa4c368a5291d284b65ae44cf6287f7673f49e786ca5cbf"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SpinnerModule-4492b39c2c25a3eae89e8afafd58f221132e7232e442bec6b6ba1acff2e8e9b9bed6201dd96e071bdfa4c368a5291d284b65ae44cf6287f7673f49e786ca5cbf"' :
                                            'id="xs-components-links-module-SpinnerModule-4492b39c2c25a3eae89e8afafd58f221132e7232e442bec6b6ba1acff2e8e9b9bed6201dd96e071bdfa4c368a5291d284b65ae44cf6287f7673f49e786ca5cbf"' }>
                                            <li class="link">
                                                <a href="components/SpinnerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SpinnerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TaxrefModule.html" data-type="entity-link" >TaxrefModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TaxrefModule-b35e95f412bc95f9ab31d310202f3d09ad1d13a764a47fe47719b3a693365bc683ecee781d0060c735419363ce7806f1084c8d815d64d4e0546db29c61fa12f6"' : 'data-target="#xs-components-links-module-TaxrefModule-b35e95f412bc95f9ab31d310202f3d09ad1d13a764a47fe47719b3a693365bc683ecee781d0060c735419363ce7806f1084c8d815d64d4e0546db29c61fa12f6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TaxrefModule-b35e95f412bc95f9ab31d310202f3d09ad1d13a764a47fe47719b3a693365bc683ecee781d0060c735419363ce7806f1084c8d815d64d4e0546db29c61fa12f6"' :
                                            'id="xs-components-links-module-TaxrefModule-b35e95f412bc95f9ab31d310202f3d09ad1d13a764a47fe47719b3a693365bc683ecee781d0060c735419363ce7806f1084c8d815d64d4e0546db29c61fa12f6"' }>
                                            <li class="link">
                                                <a href="components/TaxrefComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaxrefComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TrisModule.html" data-type="entity-link" >TrisModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TrisModule-4fd4afbc240e0a0288d872282e274ed5aaf2113c1a905be6d46b75594158235fd37b7e6c1492044cfbfff571e28e188ba3aedfcc60b699bb94b24f5ab7be3ab4"' : 'data-target="#xs-components-links-module-TrisModule-4fd4afbc240e0a0288d872282e274ed5aaf2113c1a905be6d46b75594158235fd37b7e6c1492044cfbfff571e28e188ba3aedfcc60b699bb94b24f5ab7be3ab4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TrisModule-4fd4afbc240e0a0288d872282e274ed5aaf2113c1a905be6d46b75594158235fd37b7e6c1492044cfbfff571e28e188ba3aedfcc60b699bb94b24f5ab7be3ab4"' :
                                            'id="xs-components-links-module-TrisModule-4fd4afbc240e0a0288d872282e274ed5aaf2113c1a905be6d46b75594158235fd37b7e6c1492044cfbfff571e28e188ba3aedfcc60b699bb94b24f5ab7be3ab4"' }>
                                            <li class="link">
                                                <a href="components/TriEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TriEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TrisComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TrisComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TrisFiltersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TrisFiltersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TrisTableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TrisTableComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TrisRoutingModule.html" data-type="entity-link" >TrisRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AgentModel.html" data-type="entity-link" >AgentModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/Http.html" data-type="entity-link" >Http</a>
                            </li>
                            <li class="link">
                                <a href="classes/Page.html" data-type="entity-link" >Page</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaxrefFiltersModel.html" data-type="entity-link" >TaxrefFiltersModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/TriForm.html" data-type="entity-link" >TriForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/TriModel.html" data-type="entity-link" >TriModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/TrisFilters.html" data-type="entity-link" >TrisFilters</a>
                            </li>
                            <li class="link">
                                <a href="classes/TrisFiltersForm.html" data-type="entity-link" >TrisFiltersForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/TrisModel.html" data-type="entity-link" >TrisModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/TrisModelMetadata.html" data-type="entity-link" >TrisModelMetadata</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AgentsSelectService.html" data-type="entity-link" >AgentsSelectService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TaxrefService.html" data-type="entity-link" >TaxrefService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TrisService.html" data-type="entity-link" >TrisService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Agent.html" data-type="entity-link" >Agent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Agents.html" data-type="entity-link" >Agents</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TaxrefFilters.html" data-type="entity-link" >TaxrefFilters</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TaxrefHttpResponse.html" data-type="entity-link" >TaxrefHttpResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Tris.html" data-type="entity-link" >Tris</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TrisState.html" data-type="entity-link" >TrisState</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});