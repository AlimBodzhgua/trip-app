import { FC, memo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { registerUser } from 'redux/actions/userActions';
import { ThreeDots } from 'react-loader-spinner';
import { createNewUser } from 'utils/utils';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/UI/Button/Button';
import { AppLink } from 'components/UI/AppLink/AppLink';
import { RouteNames } from 'router/routes';
import classes from '../auth.module.css';

interface IFormInput {
	login: string;
	email: string;
	password: string;
}

export const RegisterForm: FC = memo(() => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const {errorMessage, isLoading} = useAppSelector(state => state.user);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit, 
		formState: { errors }
	} = useForm<IFormInput>();

	const onSubmit: SubmitHandler<IFormInput> = async (e) => {
		const user = createNewUser(e);
		const { meta } = await dispatch(registerUser(user));

		if (meta.requestStatus === 'fulfilled') {
			navigate('/travels');
		}
	};

	return (
		<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
			<input 
				type='text'
				placeholder={t('Login')}
				className={classes.input}
				{...register('login', {
					required: {
						value: true,
						message: t('Login is required field'),
					},
					minLength: {
						value: 6,
						message: t('Login at least 6 characters long'),
					}
				})}
			/>
			{errors.login && 
				<div className={classes.error}>{errors.login.message}</div>
			}
			<input 
				type='email'
				placeholder={t('Email')}
				className={classes.input}
				{...register('email', {
					required: {
						value: true,
						message: t('Email is required field'),
					}
				})}
			/>
			{errors.email && 
				<div className={classes.error}>{errors.email.message}</div>
			}
			<input 
				type='password'
				placeholder={t('Password')}
				className={classes.input}
				{...register('password', {
					required: {
						value: true,
						message: t('Password is required field'),
					},
					minLength: {
						value: 6,
						message: t('Password at least 6 characters long')
					}
				})}
			/>
			{errors.password && 
				<div className={classes.error}>{errors.password.message}</div>
			}
			{errorMessage &&
				<div className={classes.error}>{t('User with such email already exist')}</div>
			}
			<div className={classes.redirectInfo}>
				<div className={classes.redirectText}>{t('Already have an account?')}</div>
				<AppLink
					to={RouteNames.LOGIN}
					className={classes.redirectLink}
				>
					{t('Login')}
				</AppLink>
			</div>
			<Button
				type='submit'
				className={classes.btn}
				theme='blue'
				size='sm'
			>
				{isLoading 
					? 	<>
							{t('Loading')}
							<ThreeDots 
								height='22' 
								width='34' 
								radius='9'
								color='#f2f2f2' 
								ariaLabel='three-dots-loading'
								visible={true}
							/>
						</>
					: 	<>{t('Register')}</>
				}
			</Button>
		</form>
	);
});