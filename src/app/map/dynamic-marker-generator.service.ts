import { Injectable } from '@angular/core';

@Injectable()
export class DynamicMarkerGeneratorService {
  private TPMarkerStr: string =
    '<?xml version="1.0" encoding="UTF-8" standalone="no"?><!-- Created with Inkscape (http://www.inkscape.org/) -->' +
    '<svg' +
    '   xmlns:dc="http://purl.org/dc/elements/1.1/"' +
    '   xmlns:cc="http://creativecommons.org/ns#"' +
    '   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"' +
    '   xmlns:svg="http://www.w3.org/2000/svg"' +
    '   xmlns="http://www.w3.org/2000/svg"' +
    '   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"' +
    '   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"' +
    '   width="4.3444738mm"' +
    '   height="5.4558601mm"' +
    '   viewBox="0 0 4.3444738 5.4558602"' +
    '   version="1.1"' +
    '   id="svg3808"' +
    '   inkscape:version="0.92.2 5c3e80d, 2017-08-06"' +
    '   sodipodi:docname="base-maker-1.svg">' +
    '  <defs' +
    '     id="defs3802" />' +
    '  <sodipodi:namedview' +
    '     id="base"' +
    '     pagecolor="#ffffff"' +
    '     bordercolor="#666666"' +
    '     borderopacity="1.0"' +
    '     inkscape:pageopacity="0.0"' +
    '     inkscape:pageshadow="2"' +
    '     inkscape:zoom="64"' +
    '     inkscape:cx="4.2933275"' +
    '     inkscape:cy="10.602718"' +
    '     inkscape:document-units="mm"' +
    '     inkscape:current-layer="layer1"' +
    '     showgrid="false"' +
    '     inkscape:window-width="3840"' +
    '     inkscape:window-height="2056"' +
    '     inkscape:window-x="0"' +
    '     inkscape:window-y="50"' +
    '     inkscape:window-maximized="1"' +
    '     inkscape:measure-start="0,0"' +
    '     inkscape:measure-end="0,0" />' +
    '  <metadata' +
    '     id="metadata3805">' +
    '    <rdf:RDF>' +
    '      <cc:Work' +
    '         rdf:about="">' +
    '        <dc:format>image/svg+xml</dc:format>' +
    '        <dc:type' +
    '           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />' +
    '        <dc:title></dc:title>' +
    '      </cc:Work>' +
    '    </rdf:RDF>' +
    '  </metadata>' +
    '  <g' +
    '     inkscape:label="Layer 1"' +
    '     inkscape:groupmode="layer"' +
    '     id="layer1"' +
    '     transform="translate(-74.021925,-121.85416)">' +
    '    <path' +
    '       id="path3818"' +
    '       d="m 76.19416,121.85416 c 0.55569,0 1.111378,0.25258 1.515516,0.65672 0.404136,0.45465 0.656723,0.95983 0.656723,1.56603 0,0.60621 -0.252587,1.26295 -0.656723,1.66708 l -1.515516,1.56603 -1.515512,-1.56603 c -0.40414,-0.40413 -0.656723,-1.01033 -0.656723,-1.66708 0,-0.6062 0.202067,-1.11138 0.656723,-1.56603 0.404138,-0.40414 0.959824,-0.65672 1.515512,-0.65672 z"' +
    '       class="path1"' +
    '       scale="0.1"' +
    '       inkscape:connector-curvature="0"' +
    '       style="fill:{{{color}}};stroke-width:0.50517142"/>' +
    '    <path' +
    '       style="color:#000000;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:medium;line-height:normal;font-family:sans-serif;font-variant-ligatures:normal;font-variant-position:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-alternates:normal;font-feature-settings:normal;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000000;letter-spacing:normal;word-spacing:normal;text-transform:none;writing-mode:lr-tb;direction:ltr;text-orientation:mixed;dominant-baseline:auto;baseline-shift:baseline;text-anchor:start;white-space:normal;shape-padding:0;clip-rule:nonzero;display:inline;overflow:visible;visibility:visible;opacity:1;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#000000;solid-opacity:1;vector-effect:none;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.4529188;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate"' +
    '       d="m 76.19416,121.85416 c -0.56562,0 -1.113449,0.25307 -1.514957,0.65631 -0.442267,0.44416 -0.653512,0.97199 -0.653512,1.56708 0,0.64827 0.245344,1.24844 0.653512,1.65836 l 1.514957,1.57411 1.516706,-1.57411 0.0018,-0.002 c 0.413847,-0.41663 0.651766,-1.04965 0.651766,-1.6566 0,-0.60769 -0.259057,-1.12075 -0.644775,-1.55655 l -0.0053,-0.005 -0.0035,-0.005 c -0.401509,-0.40324 -0.951083,-0.65633 -1.516706,-0.65633 z m 0,0.4545 c 0.426864,0 0.870401,0.2006 1.191698,0.5212 0.333075,0.37873 0.525954,0.76942 0.525954,1.24769 0,0.48164 -0.21242,1.0276 -0.520712,1.33721 l -0.0018,0.002 -1.195191,1.24068 -1.193445,-1.24068 -0.0018,-0.002 c -0.314955,-0.31629 -0.520711,-0.8053 -0.520711,-1.33721 0,-0.49423 0.149465,-0.8731 0.520711,-1.24594 0.321612,-0.32299 0.766524,-0.52295 1.195192,-0.52295 z"' +
    '       id="path3818-6"' +
    '       inkscape:connector-curvature="0" /></g></svg>';

  private TPMarkerCompletedStr: string =
    '<?xml version="1.0" encoding="UTF-8" standalone="no"?>' +
    '<!-- Created with Inkscape (http://www.inkscape.org/) -->' +
    '' +
    '<svg' +
    '   xmlns:dc="http://purl.org/dc/elements/1.1/"' +
    '   xmlns:cc="http://creativecommons.org/ns#"' +
    '   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"' +
    '   xmlns:svg="http://www.w3.org/2000/svg"' +
    '   xmlns="http://www.w3.org/2000/svg"' +
    '   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"' +
    '   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"' +
    '   width="4.3444738mm"' +
    '   height="5.4558601mm"' +
    '   viewBox="0 0 4.3444738 5.4558601"' +
    '   version="1.1"' +
    '   id="svg8"' +
    '   sodipodi:docname="base-marker-1-completed.svg"' +
    '   inkscape:version="0.92.2 5c3e80d, 2017-08-06">' +
    '  <defs' +
    '     id="defs2" />' +
    '  <sodipodi:namedview' +
    '     id="base"' +
    '     pagecolor="#ffffff"' +
    '     bordercolor="#666666"' +
    '     borderopacity="1.0"' +
    '     inkscape:pageopacity="0.0"' +
    '     inkscape:pageshadow="2"' +
    '     inkscape:zoom="31.678384"' +
    '     inkscape:cx="4.9346189"' +
    '     inkscape:cy="11.866009"' +
    '     inkscape:document-units="mm"' +
    '     inkscape:current-layer="layer2"' +
    '     showgrid="false"' +
    '     inkscape:window-width="2558"' +
    '     inkscape:window-height="1062"' +
    '     inkscape:window-x="0"' +
    '     inkscape:window-y="0"' +
    '     inkscape:window-maximized="0" />' +
    '  <metadata' +
    '     id="metadata5">' +
    '    <rdf:RDF>' +
    '      <cc:Work' +
    '         rdf:about="">' +
    '        <dc:format>image/svg+xml</dc:format>' +
    '        <dc:type' +
    '           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />' +
    '      </cc:Work>' +
    '    </rdf:RDF>' +
    '  </metadata>' +
    '  <g' +
    '     inkscape:label="bg"' +
    '     inkscape:groupmode="layer"' +
    '     id="layer1"' +
    '     transform="translate(-87.030141,-154.42088)"' +
    '     style="display:inline">' +
    '    <g' +
    '       transform="translate(13.008216,32.56672)"' +
    '       id="layer1-6"' +
    '       inkscape:label="Layer 1">' +
    '      <path' +
    '         style="fill:{{{color}}};stroke-width:0.50517142"' +
    '         inkscape:connector-curvature="0"' +
    '         scale="0.1"' +
    '         class="path1"' +
    '         d="m 76.19416,121.85416 c 0.55569,0 1.111378,0.25258 1.515516,0.65672 0.404136,0.45465 0.656723,0.95983 0.656723,1.56603 0,0.60621 -0.252587,1.26295 -0.656723,1.66708 l -1.515516,1.56603 -1.515512,-1.56603 c -0.40414,-0.40413 -0.656723,-1.01033 -0.656723,-1.66708 0,-0.6062 0.202067,-1.11138 0.656723,-1.56603 0.404138,-0.40414 0.959824,-0.65672 1.515512,-0.65672 z"' +
    '         id="path3818" />' +
    '      <path' +
    '         inkscape:connector-curvature="0"' +
    '         id="path3818-6"' +
    '         d="m 76.19416,121.85416 c -0.56562,0 -1.113449,0.25307 -1.514957,0.65631 -0.442267,0.44416 -0.653512,0.97199 -0.653512,1.56708 0,0.64827 0.245344,1.24844 0.653512,1.65836 l 1.514957,1.57411 1.516706,-1.57411 0.0018,-0.002 c 0.413847,-0.41663 0.651766,-1.04965 0.651766,-1.6566 0,-0.60769 -0.259057,-1.12075 -0.644775,-1.55655 l -0.0053,-0.005 -0.0035,-0.005 c -0.401509,-0.40324 -0.951083,-0.65633 -1.516706,-0.65633 z m 0,0.4545 c 0.426864,0 0.870401,0.2006 1.191698,0.5212 0.333075,0.37873 0.525954,0.76942 0.525954,1.24769 0,0.48164 -0.21242,1.0276 -0.520712,1.33721 l -0.0018,0.002 -1.195191,1.24068 -1.193445,-1.24068 -0.0018,-0.002 c -0.314955,-0.31629 -0.520711,-0.8053 -0.520711,-1.33721 0,-0.49423 0.149465,-0.8731 0.520711,-1.24594 0.321612,-0.32299 0.766524,-0.52295 1.195192,-0.52295 z"' +
    '         style="color:#000000;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:medium;line-height:normal;font-family:sans-serif;font-variant-ligatures:normal;font-variant-position:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-alternates:normal;font-feature-settings:normal;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000000;letter-spacing:normal;word-spacing:normal;text-transform:none;writing-mode:lr-tb;direction:ltr;text-orientation:mixed;dominant-baseline:auto;baseline-shift:baseline;text-anchor:start;white-space:normal;shape-padding:0;clip-rule:nonzero;display:inline;overflow:visible;visibility:visible;opacity:1;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#000000;solid-opacity:1;vector-effect:none;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.4529188;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate" />' +
    '    </g>' +
    '  </g>' +
    '  <g' +
    '     inkscape:groupmode="layer"' +
    '     id="layer2"' +
    '     inkscape:label="pipa"' +
    '     style="display:inline">' +
    '    <path' +
    '       style="fill:none;stroke:#000000;stroke-width:0.52236181px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"' +
    '       d="m 1.0127205,2.6121696 0.890435,0.791498 1.4016106,-1.8798073"' +
    '       id="path4602"' +
    '       inkscape:connector-curvature="0" />' +
    '  </g>' +
    '</svg>';

  private TPMarkerSelectedStr: string =
    '<?xml version="1.0" encoding="UTF-8" standalone="no"?>' +
    '<svg' +
    '   xmlns:dc="http://purl.org/dc/elements/1.1/"' +
    '   xmlns:cc="http://creativecommons.org/ns#"' +
    '   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"' +
    '   xmlns:svg="http://www.w3.org/2000/svg"' +
    '   xmlns="http://www.w3.org/2000/svg"' +
    '   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"' +
    '   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"' +
    '   width="7.5288739mm"' +
    '   height="9.4548798mm"' +
    '   viewBox="0 0 7.5288739 9.4548799"' +
    '   version="1.1"' +
    '   id="svg3808"' +
    '   inkscape:version="0.92.2 5c3e80d, 2017-08-06"' +
    '   sodipodi:docname="base-marker-selected.svg">' +
    '  <defs' +
    '     id="defs3802" />' +
    '  <sodipodi:namedview' +
    '     id="base"' +
    '     pagecolor="#ffffff"' +
    '     bordercolor="#666666"' +
    '     borderopacity="1.0"' +
    '     inkscape:pageopacity="0.0"' +
    '     inkscape:pageshadow="2"' +
    '     inkscape:zoom="45.254834"' +
    '     inkscape:cx="-0.83921734"' +
    '     inkscape:cy="16.690812"' +
    '     inkscape:document-units="mm"' +
    '     inkscape:current-layer="layer1"' +
    '     showgrid="false"' +
    '     inkscape:window-width="3840"' +
    '     inkscape:window-height="2056"' +
    '     inkscape:window-x="0"' +
    '     inkscape:window-y="50"' +
    '     inkscape:window-maximized="1"' +
    '     inkscape:measure-start="0,0"' +
    '     inkscape:measure-end="0,0" />' +
    '  <metadata' +
    '     id="metadata3805">' +
    '    <rdf:RDF>' +
    '      <cc:Work' +
    '         rdf:about="">' +
    '        <dc:format>image/svg+xml</dc:format>' +
    '        <dc:type' +
    '           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />' +
    '        <dc:title></dc:title>' +
    '      </cc:Work>' +
    '    </rdf:RDF>' +
    '  </metadata>' +
    '  <g' +
    '     inkscape:label="Layer 1"' +
    '     inkscape:groupmode="layer"' +
    '     id="layer1"' +
    '     transform="translate(-74.021925,-121.85416)">' +
    '    <path' +
    '       id="path3818"' +
    '       d="m 77.786358,121.85416 c 0.962998,0 1.925993,0.43772 2.626355,1.13808 0.700358,0.7879 1.138086,1.66336 1.138086,2.71389 0,1.05055 -0.437728,2.18867 -1.138086,2.88902 l -2.626355,2.71389 -2.626347,-2.71389 c -0.700365,-0.70035 -1.138086,-1.75088 -1.138086,-2.88902 0,-1.05053 0.350177,-1.92599 1.138086,-2.71389 0.700362,-0.70036 1.663353,-1.13808 2.626347,-1.13808 z"' +
    '       class="path1"' +
    '       scale="0.1"' +
    '       inkscape:connector-curvature="0"' +
    '       style="fill:{{{color}}};stroke-width:0.87545049" />' +
    '    <path' +
    '       style="color:#000000;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:medium;line-height:normal;font-family:sans-serif;font-variant-ligatures:normal;font-variant-position:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-alternates:normal;font-feature-settings:normal;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000000;letter-spacing:normal;word-spacing:normal;text-transform:none;writing-mode:lr-tb;direction:ltr;text-orientation:mixed;dominant-baseline:auto;baseline-shift:baseline;text-anchor:start;white-space:normal;shape-padding:0;clip-rule:nonzero;display:inline;overflow:visible;visibility:visible;opacity:1;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#000000;solid-opacity:1;vector-effect:none;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.78489786;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate"' +
    '       d="m 77.786358,121.85416 c -0.980206,0 -1.929581,0.43856 -2.625385,1.13737 -0.766439,0.76972 -1.132522,1.68444 -1.132522,2.71571 0,1.12344 0.425176,2.16352 1.132522,2.8739 l 2.625385,2.7279 2.628417,-2.7279 0.0031,-0.003 c 0.717187,-0.72201 1.129495,-1.81902 1.129495,-2.87085 0,-1.05311 -0.44894,-1.94224 -1.11738,-2.69747 l -0.0092,-0.009 -0.0061,-0.009 c -0.695806,-0.6988 -1.648205,-1.1374 -2.628417,-1.1374 z m 0,0.78764 c 0.739746,0 1.508385,0.34763 2.065186,0.90323 0.577211,0.65633 0.911466,1.33338 0.911466,2.16221 0,0.83468 -0.368119,1.78081 -0.902382,2.31736 l -0.0031,0.003 -2.071239,2.15007 -2.068213,-2.15007 -0.0031,-0.003 c -0.54581,-0.54813 -0.90238,-1.39557 -0.90238,-2.31736 0,-0.85649 0.259019,-1.51306 0.90238,-2.15918 0.557346,-0.55974 1.328368,-0.90626 2.07124,-0.90626 z"' +
    '       id="path3818-6"' +
    '       inkscape:connector-curvature="0" />' +
    '  </g>' +
    '</svg>';

  private VMarkerStr: string =
    '<?xml version="1.0" encoding="UTF-8" standalone="no"?>' +
    '<svg' +
    '   xmlns:dc="http://purl.org/dc/elements/1.1/"' +
    '   xmlns:cc="http://creativecommons.org/ns#"' +
    '   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"' +
    '   xmlns:svg="http://www.w3.org/2000/svg"' +
    '   xmlns="http://www.w3.org/2000/svg"' +
    '   id="svg8"' +
    '   version="1.1"' +
    '   viewBox="0 0 7.1770716 4.545392"' +
    '   height="4.545392mm"' +
    '   width="7.1770716mm">' +
    '  <defs' +
    '     id="defs2" />' +
    '  <metadata' +
    '     id="metadata5">' +
    '    <rdf:RDF>' +
    '      <cc:Work' +
    '         rdf:about="">' +
    '        <dc:format>image/svg+xml</dc:format>' +
    '        <dc:type' +
    '           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />' +
    '        <dc:title></dc:title>' +
    '      </cc:Work>' +
    '    </rdf:RDF>' +
    '  </metadata>' +
    '  <g' +
    '     transform="translate(-37.477795,-169.10616)"' +
    '     id="layer1">' +
    '    <g' +
    '       transform="matrix(0.01172726,0,0,0.01172726,37.477795,167.79031)"' +
    '       id="g80">' +
    '      <g' +
    '         id="g20">' +
    '        <g' +
    '           id="g18">' +
    '          <path' +
    '             style="fill:{{{color}}}"' +
    ' d="m 504.9,395.756 c -28.684,0 -52.02,23.342 -52.02,52.02 0,28.684 23.336,52.02 52.02,52.02 28.678,0 52.02,-23.336 52.02,-52.02 0,-28.678 -23.342,-52.02 -52.02,-52.02 z m 0,67.32 c -8.439,0 -15.3,-6.861 -15.3,-15.3 0,-8.439 6.861,-15.3 15.3,-15.3 8.439,0 15.3,6.861 15.3,15.3 0,8.439 -6.861,15.3 -15.3,15.3 z"' +
    '             id="path10" />' +
    '          <path' +
    '             style="fill:{{{color}}}"' +
    ' d="M 499.918,179.518 H 410.04 c -6.763,0 -12.24,5.484 -12.24,12.24 v 238.68 c 0,6.756 5.477,12.24 12.24,12.24 h 12.981 c 6.059,0 11.426,-4.364 12.209,-10.373 4.804,-36.806 34.162,-59.633 69.676,-59.633 35.514,0 64.872,22.828 69.676,59.633 0.783,6.01 6.144,10.373 12.209,10.373 h 12.968 c 6.756,0 12.24,-5.484 12.24,-12.24 v -119.34 c 0,-2.876 -1.01,-5.655 -2.852,-7.852 l -99.842,-119.34 c -2.324,-2.778 -5.764,-4.388 -9.387,-4.388 z m -77.638,97.92 v -61.2 c 0,-6.756 5.477,-12.24 12.24,-12.24 h 53.917 c 3.629,0 7.075,1.616 9.4,4.406 l 50.998,61.2 c 6.64,7.974 0.973,20.074 -9.406,20.074 H 434.52 c -6.763,0 -12.24,-5.477 -12.24,-12.24 z"' +
    '             id="path12" />' +
    '          <path' +
    '             style="fill:{{{color}}}"' +
    ' d="m 12.24,442.684 h 31.341 c 6.059,0 11.426,-4.364 12.209,-10.373 4.804,-36.806 34.162,-59.633 69.676,-59.633 35.514,0 64.872,22.828 69.676,59.633 0.783,6.01 6.144,10.373 12.209,10.373 H 361.08 c 6.757,0 12.24,-5.484 12.24,-12.24 v -306 c 0,-6.756 -5.484,-12.24 -12.24,-12.24 H 12.24 C 5.477,112.204 0,117.688 0,124.444 v 306 c 0,6.757 5.477,12.24 12.24,12.24 z"' +
    '             id="path14" />' +
    '          <path' +
    '             style="fill:{{{color}}}"' +
    ' d="m 125.46,395.756 c -28.684,0 -52.02,23.342 -52.02,52.02 0,28.684 23.336,52.02 52.02,52.02 28.678,0 52.02,-23.336 52.02,-52.02 0,-28.678 -23.342,-52.02 -52.02,-52.02 z m 0,67.32 c -8.439,0 -15.3,-6.861 -15.3,-15.3 0,-8.439 6.861,-15.3 15.3,-15.3 8.439,0 15.3,6.861 15.3,15.3 0,8.439 -6.861,15.3 -15.3,15.3 z"' +
    '             id="path16" />' +
    '        </g>' +
    '      </g>' +
    '    </g>' +
    '  </g>' +
    '</svg>';

  private VMarkerSelectedStr: string =
    '<?xml version="1.0" encoding="UTF-8" standalone="no"?>' +
    '<svg' +
    '   xmlns:dc="http://purl.org/dc/elements/1.1/"' +
    '   xmlns:cc="http://creativecommons.org/ns#"' +
    '   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"' +
    '   xmlns:svg="http://www.w3.org/2000/svg"' +
    '   xmlns="http://www.w3.org/2000/svg"' +
    '   id="svg8"' +
    '   version="1.1"' +
    '   viewBox="0 0 12.874244 8.1535329"' +
    '   height="8.153533mm"' +
    '   width="12.874244mm">' +
    '  <defs' +
    '     id="defs2" />' +
    '  <metadata' +
    '     id="metadata5">' +
    '    <rdf:RDF>' +
    '      <cc:Work' +
    '         rdf:about="">' +
    '        <dc:format>image/svg+xml</dc:format>' +
    '        <dc:type' +
    '           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />' +
    '        <dc:title></dc:title>' +
    '      </cc:Work>' +
    '    </rdf:RDF>' +
    '  </metadata>' +
    '  <g' +
    '     transform="translate(-37.477795,-169.10616)"' +
    '     id="layer1">' +
    '    <g' +
    '       transform="matrix(0.02103638,0,0,0.02103638,37.477795,166.74579)"' +
    '       id="g80">' +
    '      <g' +
    '         id="g20">' +
    '        <g' +
    '           id="g18">' +
    '          <path' +
    '             style="fill:{{{color}}}"' +
    '             d="m 504.9,395.756 c -28.684,0 -52.02,23.342 -52.02,52.02 0,28.684 23.336,52.02 52.02,52.02 28.678,0 52.02,-23.336 52.02,-52.02 0,-28.678 -23.342,-52.02 -52.02,-52.02 z m 0,67.32 c -8.439,0 -15.3,-6.861 -15.3,-15.3 0,-8.439 6.861,-15.3 15.3,-15.3 8.439,0 15.3,6.861 15.3,15.3 0,8.439 -6.861,15.3 -15.3,15.3 z"' +
    '             id="path10" />' +
    '          <path' +
    '             style="fill:{{{color}}}"' +
    '             d="M 499.918,179.518 H 410.04 c -6.763,0 -12.24,5.484 -12.24,12.24 v 238.68 c 0,6.756 5.477,12.24 12.24,12.24 h 12.981 c 6.059,0 11.426,-4.364 12.209,-10.373 4.804,-36.806 34.162,-59.633 69.676,-59.633 35.514,0 64.872,22.828 69.676,59.633 0.783,6.01 6.144,10.373 12.209,10.373 h 12.968 c 6.756,0 12.24,-5.484 12.24,-12.24 v -119.34 c 0,-2.876 -1.01,-5.655 -2.852,-7.852 l -99.842,-119.34 c -2.324,-2.778 -5.764,-4.388 -9.387,-4.388 z m -77.638,97.92 v -61.2 c 0,-6.756 5.477,-12.24 12.24,-12.24 h 53.917 c 3.629,0 7.075,1.616 9.4,4.406 l 50.998,61.2 c 6.64,7.974 0.973,20.074 -9.406,20.074 H 434.52 c -6.763,0 -12.24,-5.477 -12.24,-12.24 z"' +
    '             id="path12" />' +
    '          <path' +
    '             style="fill:{{{color}}}"' +
    '             d="m 12.24,442.684 h 31.341 c 6.059,0 11.426,-4.364 12.209,-10.373 4.804,-36.806 34.162,-59.633 69.676,-59.633 35.514,0 64.872,22.828 69.676,59.633 0.783,6.01 6.144,10.373 12.209,10.373 H 361.08 c 6.757,0 12.24,-5.484 12.24,-12.24 v -306 c 0,-6.756 -5.484,-12.24 -12.24,-12.24 H 12.24 C 5.477,112.204 0,117.688 0,124.444 v 306 c 0,6.757 5.477,12.24 12.24,12.24 z"' +
    '             id="path14" />' +
    '          <path' +
    '             style="fill:{{{color}}}"' +
    '             d="m 125.46,395.756 c -28.684,0 -52.02,23.342 -52.02,52.02 0,28.684 23.336,52.02 52.02,52.02 28.678,0 52.02,-23.336 52.02,-52.02 0,-28.678 -23.342,-52.02 -52.02,-52.02 z m 0,67.32 c -8.439,0 -15.3,-6.861 -15.3,-15.3 0,-8.439 6.861,-15.3 15.3,-15.3 8.439,0 15.3,6.861 15.3,15.3 0,8.439 -6.861,15.3 -15.3,15.3 z"' +
    '             id="path16" />' +
    '        </g>' +
    '      </g>' +
    '    </g>' +
    '  </g>' +
    '</svg>';

  private TPMarkerSelectedCompletedStr: string = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' +
    '<svg\n' +
    '   xmlns:dc="http://purl.org/dc/elements/1.1/"\n' +
    '   xmlns:cc="http://creativecommons.org/ns#"\n' +
    '   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"\n' +
    '   xmlns:svg="http://www.w3.org/2000/svg"\n' +
    '   xmlns="http://www.w3.org/2000/svg"\n' +
    '   id="svg8"\n' +
    '   version="1.1"\n' +
    '   viewBox="0 0 7.5288739 9.4548798"\n' +
    '   height="9.4548798mm"\n' +
    '   width="7.5288739mm">\n' +
    '  <defs\n' +
    '     id="defs2" />\n' +
    '  <metadata\n' +
    '     id="metadata5">\n' +
    '    <rdf:RDF>\n' +
    '      <cc:Work\n' +
    '         rdf:about="">\n' +
    '        <dc:format>image/svg+xml</dc:format>\n' +
    '        <dc:type\n' +
    '           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />\n' +
    '        <dc:title></dc:title>\n' +
    '      </cc:Work>\n' +
    '    </rdf:RDF>\n' +
    '  </metadata>\n' +
    '  <g\n' +
    '     transform="translate(-97.53318,-132.01066)"\n' +
    '     id="layer1">\n' +
    '    <g\n' +
    '       id="layer1-6"\n' +
    '       transform="translate(23.511255,10.156496)">\n' +
    '      <path\n' +
    '         id="path3818"\n' +
    '         d="m 77.786358,121.85416 c 0.962998,0 1.925993,0.43772 2.626355,1.13808 0.700358,0.7879 1.138086,1.66336 1.138086,2.71389 0,1.05055 -0.437728,2.18867 -1.138086,2.88902 l -2.626355,2.71389 -2.626347,-2.71389 c -0.700365,-0.70035 -1.138086,-1.75088 -1.138086,-2.88902 0,-1.05053 0.350177,-1.92599 1.138086,-2.71389 0.700362,-0.70036 1.663353,-1.13808 2.626347,-1.13808 z"\n' +
    '         class="path1"\n' +
    '         scale="0.1"\n' +
    '         style="fill:{{{color}}};stroke-width:0.87545049" />\n' +
    '      <path\n' +
    '         style="color:#000000;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:medium;line-height:normal;font-family:sans-serif;font-variant-ligatures:normal;font-variant-position:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-alternates:normal;font-feature-settings:normal;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000000;letter-spacing:normal;word-spacing:normal;text-transform:none;writing-mode:lr-tb;direction:ltr;text-orientation:mixed;dominant-baseline:auto;baseline-shift:baseline;text-anchor:start;white-space:normal;shape-padding:0;clip-rule:nonzero;display:inline;overflow:visible;visibility:visible;opacity:1;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#000000;solid-opacity:1;vector-effect:none;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.78489786;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate"\n' +
    '         d="m 77.786358,121.85416 c -0.980206,0 -1.929581,0.43856 -2.625385,1.13737 -0.766439,0.76972 -1.132522,1.68444 -1.132522,2.71571 0,1.12344 0.425176,2.16352 1.132522,2.8739 l 2.625385,2.7279 2.628417,-2.7279 0.0031,-0.003 c 0.717187,-0.72201 1.129495,-1.81902 1.129495,-2.87085 0,-1.05311 -0.44894,-1.94224 -1.11738,-2.69747 l -0.0092,-0.009 -0.0061,-0.009 c -0.695806,-0.6988 -1.648205,-1.1374 -2.628417,-1.1374 z m 0,0.78764 c 0.739746,0 1.508385,0.34763 2.065186,0.90323 0.577211,0.65633 0.911466,1.33338 0.911466,2.16221 0,0.83468 -0.368119,1.78081 -0.902382,2.31736 l -0.0031,0.003 -2.071239,2.15007 -2.068213,-2.15007 -0.0031,-0.003 c -0.54581,-0.54813 -0.90238,-1.39557 -0.90238,-2.31736 0,-0.85649 0.259019,-1.51306 0.90238,-2.15918 0.557346,-0.55974 1.328368,-0.90626 2.07124,-0.90626 z"\n' +
    '         id="path3818-6" />\n' +
    '    </g>\n' +
    '    <g\n' +
    '       transform="translate(106.96839,135.88823)"\n' +
    '       id="g3725">\n' +
    '      <g\n' +
    '         transform="matrix(1.4989733,0,0,1.4989733,-8.8641446,-3.5319402)"\n' +
    '         id="layer2"\n' +
    '         style="display:inline">\n' +
    '        <path\n' +
    '           style="fill:none;stroke:#000000;stroke-width:0.52236181px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"\n' +
    '           d="m 1.0127205,2.6121696 0.890435,0.791498 1.4016106,-1.8798073"\n' +
    '           id="path4602" />\n' +
    '      </g>\n' +
    '    </g>\n' +
    '  </g>\n' +
    '</svg>\n';

  public generateMarkerBase64(fillColorHex: string): string {
    return 'data:image/svg+xml;base64,'.concat(btoa(
      this.TPMarkerStr.replace(/\{\{\{color\}\}\}/g, fillColorHex)));
  }

  public generateMarkerCompletedBase64(fillColorHex: string): string {
    return 'data:image/svg+xml;base64,'.concat(btoa(
      this.TPMarkerCompletedStr.replace(/\{\{\{color\}\}\}/g, fillColorHex)));
  }

  public generateMarkerSelectedBase64(fillColorHex: string): string {
    return 'data:image/svg+xml;base64,'.concat(btoa(
      this.TPMarkerSelectedStr.replace(/\{\{\{color\}\}\}/g, fillColorHex)));
  }

  public generateMarkerSelectedCompletedBase64(fillColorHex: string): string {
    return 'data:image/svg+xml;base64,'.concat(btoa(
      this.TPMarkerSelectedCompletedStr.replace(/\{\{\{color\}\}\}/g, fillColorHex)));
  }

  public generateVehicleMarkerBase64(fillColorHex: string): string {
    return 'data:image/svg+xml;base64,'.concat(btoa(
      this.VMarkerStr.replace(/\{\{\{color\}\}\}/g, fillColorHex)));
  }

  public generateVehicleMarkerSelectedBase64(fillColorHex: string): string {
    return 'data:image/svg+xml;base64,'.concat(btoa(
      this.VMarkerSelectedStr.replace(/\{\{\{color\}\}\}/g, fillColorHex)));
  }
}
