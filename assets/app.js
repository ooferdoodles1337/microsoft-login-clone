document.addEventListener('DOMContentLoaded', () => {
    const UNAME_VIEW = "uname";
    const PWD_VIEW = "pwd";

    const errorMessages = {
        unReq: "Enter a valid email address or phone number",
            pwdReq: "Sorry, your sign-in timed out. Please sign in again."
        };

        const unameInp = document.getElementById('inp_uname');
        const pwdInp = document.getElementById('inp_pwd');

        let view = UNAME_VIEW;
        let unameVal = false;
        let pwdVal = false;

        const nxt = document.getElementById('btn_next');
        const sig = document.getElementById('btn_sig');

        nxt.addEventListener('click', handleNextClick);
        sig.addEventListener('click', handleSignInClick);

        document.querySelector('.back').addEventListener('click', handleBackClick);

        document.querySelectorAll('#btn_final').forEach((b) => {
            b.addEventListener('click', handleCloseWindow);
        });

        function handleNextClick() {
            validate(UNAME_VIEW);
            if (unameVal) {
                toggleSections('section_uname', 'section_pwd');
                updateUserIdentity();
                view = PWD_VIEW;
            }
        }

        function handleSignInClick() {
            validate(PWD_VIEW);
            if (pwdVal && view === PWD_VIEW) {
                window.location.href = 'views/debrief.html';
            }
        }

        function handleBackClick() {
            view = UNAME_VIEW;
            toggleSections('section_pwd', 'section_uname');
        }

        function handleCloseWindow() {
            window.open(location, '_self').close();
        }

        function validate(currentView) {
            if (currentView === UNAME_VIEW) {
                validateUname();
            } else if (currentView === PWD_VIEW) {
                validatePwd();
            }
        }

        function validateUname() {
            const minLength = 5;
            const type = unameInp.value.trim();

            if (!type || type.length < minLength || type.indexOf('@') === -1) {
                setError('error_uname', errorMessages.unReq);
                unameVal = false;
            } else {
                clearError('error_uname', unameInp);
                unameVal = true;
            }
        }

        function validatePwd() {
            const type = pwdInp.value.trim();
            if (!type) {
                setError('error_pwd', errorMessages.pwdReq);
                pwdVal = false;
            } else {
                clearError('error_pwd', pwdInp);
                pwdVal = true;
            }
        }

        function setError(elementId, message) {
            document.getElementById(elementId).innerText = message;
            document.getElementById(elementId.replace('error_', 'inp_')).classList.add('error-inp');
        }

    function clearError(elementId, inputElement) {
        document.getElementById(elementId).innerText = "";
        inputElement.classList.remove('error-inp');
    }

    function toggleSections(hideSectionId, showSectionId) {
        document.getElementById(hideSectionId).classList.toggle('d-none');
        document.getElementById(showSectionId).classList.remove('d-none');
    }

    function updateUserIdentity() {
        document.querySelectorAll('#user_identity').forEach((e) => {
            e.innerText = unameInp.value;
        });
    }
});
