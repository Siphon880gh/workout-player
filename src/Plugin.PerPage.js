
export const runPerPage = () => {
    document.querySelectorAll("a[target='_blank']").forEach(el=>{
        el.setAttribute("target", "_self");
    });
} // runPerPage