function main() {
    let input_el = document.getElementById("input");
    let output_el = document.getElementById("output");
    let variable_labels = Array.from(document.querySelectorAll("label"));
    let variable_sliders = variable_labels.map(x => x.querySelector("input"));
    let variable_names = variable_labels.map(x => x.classList[0]);
    let v = {};

    variable_names.forEach((name, i) => {
        v[name] = variable_sliders[i];
    });

    function wrap_em(name, value) {
        // put numbers as subscript
        return `<span class="${name}"><em>${value}</em></span>`;
    }

    function update_input_output() {
        input_el.innerHTML = `${wrap_em("w1", v.w1.value)}×
                              ${wrap_em("h1", v.h1.value)}×
                              ${wrap_em("d1", v.d1.value)}`;
        var w2 = (v.w1.value - v.f.value + 2 * v.p.value) / v.s.value + 1;
        var h2 = (v.h1.value - v.f.value + 2 * v.p.value) / v.s.value + 1;

        if (!Number.isInteger(w2)) {
            w2 = "❓";
        }
        if (!Number.isInteger(h2)) {
            h2 = "❓";
        }

        output_el.innerHTML = `${wrap_em("w2", w2)}×
                              ${wrap_em("h2", h2)}×
                              ${wrap_em("k", v.k.value)}`;
    }

    variable_labels.forEach((label, i) => {
        let value_el = document.createElement("input");
        value_el.type = "number";
        value_el.classList.add("value");
        label.insertBefore(value_el, variable_sliders[i]);
        let slider_el = variable_sliders[i];
        let slider_update = () => {
            value_el.value = slider_el.value;
            update_input_output();
        };
        let ticker_update = () => {
            slider_el.value = value_el.value;
            update_input_output();
        };
        slider_el.addEventListener("input", slider_update);
        value_el.addEventListener("input", ticker_update);
        slider_update();
    });
}
window.onload = main;
