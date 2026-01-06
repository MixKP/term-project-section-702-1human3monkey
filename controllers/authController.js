const bcrypt = require('bcryptjs');

function createAuthController(userModel) {
    async function login(req, res) {
        const { email, password } = req.body;

        const user = await userModel.getUserByEmail(email);

        if (!user || user.length === 0) {
            return res.render('pages/authen/login',
                {
                    pageTitle: 'Sign in to your account',
                    errorMessage: "Email not found, please try again",
                });
        }

        const validPassword = await bcrypt.compare(password, user[0].password);

        if (!validPassword) {
            return res.render('pages/authen/login',
                {
                    pageTitle: 'Sign in to your account',
                    errorMessage: "Invalid password, please try again",
                });
        }

        // Save user info in session
        req.session.authenticated = true;
        req.session.userId = user[0].user_id;
        req.session.role = user[0].role;
        req.session.firstName = user[0].first_name;
        req.session.lastName = user[0].last_name;
        req.session.email = user[0].email;

        res.redirect('/');
    }

    async function register(req, res) {
        const { email, password, firstName, lastName } = req.body;

        const user = await userModel.getUserByEmail(email);

        if (user.length > 0) {
            return res.render('pages/authen/register',
                {
                    pageTitle: 'Create an account',
                    errorMessage: 'Email already exists, please try again',
                });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await userModel.createUser({ email, password: hashedPassword, firstName, lastName });

        res.redirect('/auth/login');
    }

    async function logout(req, res) {
        req.session.destroy();
        return res.redirect('/');
    }

    async function authentication(req, res, next) {

        if (!req.session || !req.session.authenticated) {
            return res.redirect('/auth/login');
        }

        try {
            const user = await userModel.getUserById(req.session.userId);
            if (!user || user.length === 0) {
                req.session.destroy();
                return res.redirect('/?q=session-expired');
            }
            next();

        } catch (err) {
            console.log(err);
            return res.redirect('/auth/login');
        }
    }

    return {
        login,
        register,
        logout,
        authentication,
    }
}

module.exports = createAuthController;